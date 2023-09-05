import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";

const authOptions = ""

export default NextAuth({
    // jwt: {
    //     // signingKey: { "kty": "oct", "kid": "--", "alg": "HS256", "k": "--" },
    //     // verificationOptions: {
    //     //     algorithms: ["HS256"]
    //     // }

    // },
    session: { strategy: "jwt" },
    providers: [CredentialsProvider({

        async authorize(credentials, req) {
            const { email, password } = credentials

            try {
                await connectDB()
            } catch (error) {
                throw new Error("not connect to DB")
            }

            if (!email || !password) {
                throw new Error("invalid Data")
            }

            const user = await User.findOne({ email: email })

            if (!user) {
                throw new Error("user not exist")
            }

            const isValid = await verifyPassword(password, user.password)

            if (!isValid) {
                throw new Error("userName or password not correct")
            }
            return { email }
        }
    }),]
})

export { authOptions }

