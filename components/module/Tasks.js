import React from 'react';
import { RiMastodonLine } from "react-icons/ri"
import { BiRightArrow, BiLeftArrow } from "react-icons/bi"

const Tasks = ({ data, back, next, fetchTodos }) => {

    const updateHandler = async (id, status) => {
        const res = await fetch("/api/todos", {
            method: "PATCH",
            body: JSON.stringify({ id, status }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        console.log(data)
        if (data.status === "success") fetchTodos()

    }


    return (
        <div className='tasks'>
            {data?.map(item => (
                <div key={item._id} className='tasks__card'>
                    <span className='todo'>{item.status}</span>
                    <RiMastodonLine />
                    <h4>{item.title}</h4>
                    <div>
                        {back ? <button name='back' className='button-back' onClick={() => updateHandler(item._id, back)}><BiLeftArrow /> Back</button> : null}
                        {next ? <button name='next' className='button-back' onClick={() => updateHandler(item._id, next)}>Next <BiRightArrow /></button> : null}
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default Tasks;