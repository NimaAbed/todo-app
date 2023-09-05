import { hash, compare } from "bcryptjs"

async function hashPassword(password) {
    const result = await hash(password, 12)
    return result
}

async function verifyPassword(password, hashedPassword) {
    const result = await compare(password, hashedPassword)
    return result
}

export { hashPassword, verifyPassword }