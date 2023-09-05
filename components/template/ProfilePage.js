import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg"
import ProfileForm from '../module/ProfileForm';
import ProfileData from '../module/ProfileData';

const ProfilePage = () => {
    const [userValue, setUserValue] = useState({
        name: "",
        lastName: "",
        password: "",
    })
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/profile")
            const data = await res.json()
            if (data.status === "success" && data.data.name && data.data.lastName) {
                setData(data.data)
            }
        }

        fetchData()
    }, [])

    const submitHandler = async () => {
        const res = await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify(userValue),
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        console.log(data)
    }

    return (
        <div className='profile-form'>
            <h2> <CgProfile /> Profile</h2>
            {data ? <ProfileData data={data} />
                : <ProfileForm userValue={userValue} setUserValue={setUserValue} submitHandler={submitHandler} />}
        </div>
    );
};

export default ProfilePage;