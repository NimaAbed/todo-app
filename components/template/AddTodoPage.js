import React, { useState } from 'react';
import { GrAddCircle } from "react-icons/gr"
import { BsAlignStart } from "react-icons/bs"
import RadioButton from '../element/RadioButton';
import { FiSettings } from "react-icons/fi"
import { AiOutlineFileSearch } from "react-icons/ai"
import { MdDoneAll } from "react-icons/md"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTodoPage = () => {
    const [title, setTitle] = useState("")
    const [status, setStaus] = useState("todo")

    const addHandler = async () => {
        const res = await fetch("/api/todos", {
            method: "POST",
            body: JSON.stringify({ title, status }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        console.log(data)
        if (data.status === "success") {
            setTitle("")
            setStaus("todo")
            toast.success("Todo added 👌")
        }
    }

    return (
        <div className='add-form'>
            <h2><GrAddCircle />  New Todo</h2>
            <div className='add-form__input'>
                <div className='add-form__input--first'>
                    <label htmlFor='title'>Title:</label>
                    <input id="title" type='text' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='add-form__input--second'>
                    {/* <div className='todo'>
                        <label htmlFor='todo'><BsAlignStart />todo</label>
                        <input type='radio' id="todo" name='todo' value="todo" checked={status === "todo"} onChange={e => setStaus(e.target.value)} />
                    </div> */}
                    <RadioButton status={status} setStaus={setStaus} value="todo" title="Todo">
                        <BsAlignStart />
                    </RadioButton>
                    <RadioButton status={status} setStaus={setStaus} value="inProgress" title="In Progress">
                        <FiSettings />
                    </RadioButton>
                    <RadioButton status={status} setStaus={setStaus} value="review" title="Review">
                        <AiOutlineFileSearch />
                    </RadioButton>
                    <RadioButton status={status} setStaus={setStaus} value="done" title="Done">
                        <MdDoneAll />
                    </RadioButton>
                </div>
                <button onClick={addHandler}>Add</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddTodoPage;