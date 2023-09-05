import { getSession } from "next-auth/react"
import User from "../../models/User"
import connectDB from "../../utils/connectDB"
import { verifyPassword } from "../../utils/auth"

export default async function handler(req, res) {
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
        const { name, lastName, password } = req.body

        if (!name || !lastName || !password) {
            return res.status(422).json({ status: "failed", message: "invaild data" })
        }

        const isValid = await verifyPassword(password, user.password)

        if (!isValid) {
            return res.status(422).json({ status: "failed", message: "password not correct" })
        }

        user.name = name
        user.lastName = lastName
        user.save()

        res.status(201).json({ status: "success", data: { name, lastName, email: user.email } })

    } else if (req.method === "GET") {
        res.status(200).json({ status: "success", data: { name: user.name, lastName: user.lastName, email: user.email } })
    }

}