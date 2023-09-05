import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from "next-auth/react"
import Link from 'next/link';

const SigninPage = () => {
    const router = useRouter()
    const [userValue, setUserValue] = useState({
        email: "",
        password: ""
    })
    const { status } = useSession()

    useEffect(() => {
        if (status === "authenticated") router.replace("/")
    }, [status])


    const changeHandler = (evt) => {
        const { value, name } = evt.target
        setUserValue({ ...userValue, [name]: value })
    }

    const loginHandler = async () => {
        const res = await signIn("credentials", {
            ...userValue,
            redirect: false
        })
        console.log(res)
        if (res.ok) router.replace("/")
    }

    return (
        <div className='signin-form'>
            <h3>Login From</h3>
            <input type='text' name="email" placeholder='Email' value={userValue.email} onChange={changeHandler} />
            <input type='password' name="password" placeholder='Password' value={userValue.password} onChange={changeHandler} />
            <button onClick={loginHandler}>Login</button>
            <div>
                <p>Create an account?</p>
                <Link href="/signup">Sign up</Link>
            </div>
        </div>
    );
};

export default SigninPage;