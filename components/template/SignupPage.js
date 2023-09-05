import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SignupPage = () => {
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

    const signupHandler = async () => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ ...userValue }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        console.log(data)
        if (data.status === "success") router.push("/signin")
    }

    return (
        <div className='signin-form'>
            <h3>Registration From</h3>
            <input type='text' name="email" placeholder='Email' value={userValue.email} onChange={changeHandler} />
            <input type='password' name="password" placeholder='Password' value={userValue.password} onChange={changeHandler} />
            <button onClick={signupHandler}>Register</button>
            <div>
                <p>Have an account?</p>
                <Link href="/signin">Sign in</Link>
            </div>
        </div>
    );
};

export default SignupPage;