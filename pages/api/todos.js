import connectDB from "../../utils/connectDB"
import User from "../../models/User"
import { getSession, useSession } from "next-auth/react"
import { sortTodos } from "../../utils/sortTodos"


async function handler(req, res) {
    try {
        await connectDB()
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "not connect to DB" })
    }


    const session = await getSession({ req })


    if (!session) {
        return res.status(401).json({ status: "failed", message: "your are not login" })
    }
    const user = await User.findOne({ email: session.user.email })

    if (!user) {
        return res.status(404).json({ status: "failed", message: "user dosent exist" })
    }

    if (req.method === "POST") {
        const { title, status } = req.body

        if (!title || !status) {
            return res.status(422).json({ status: "failed", message: "invalid data" })
        }
        user.todos.push({ title, status })
        user.save()
        return res.status(201).json({ status: "success", message: "data saved" })
    } else if (req.method === "GET") {
        const sortedData = sortTodos(user.todos)
        if (!sortedData) {
            res.status(404).json({ status: "failed", message: "todos not found" })
        }
        res.status(200).json({ status: "success", data: sortedData })
    } else if (req.method === "PATCH") {
        const { id, status } = req.body
        if (!id || !status) {
            return res.status(422).json({ status: "failed", message: "invalid data" })
        }
        const result = await User.updateOne({ "todos._id": id }, { $set: { "todos.$.status": status } })
        // const result = user.todos.find(item => item._id == id)
        // result.status = status
        // user.save()
        console.log(result)
        res.status(201).json({ status: "success", data: { result } })
    }

}

export default handler