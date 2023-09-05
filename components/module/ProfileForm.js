import React from 'react';

const ProfileForm = ({ userValue, setUserValue, submitHandler }) => {

    const changeHandler = (evt) => {
        const { name, value } = evt.target
        setUserValue({ ...userValue, [name]: value })
    }
    return (
        <>
            <div className='profile-form__input'>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input id="name" name='name' type='text' value={userValue.name} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name</label>
                    <input id="lastName" name='lastName' type='text' value={userValue.lastName} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input id="password" name='password' type='password' value={userValue.password} onChange={changeHandler} />
                </div>
                <button onClick={submitHandler}>Submit</button>
            </div>
        </>
    );
};

export default ProfileForm;