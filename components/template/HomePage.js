import React, { useEffect, useState } from 'react';
import Tasks from '../module/Tasks';

const HomePage = () => {
    const [todos, setTodos] = useState({})

    useEffect(() => {
        fetchedData()
    }, [])

    const fetchedData = async () => {
        const res = await fetch("/api/todos")
        const data = await res.json()
        console.log(data)
        if (data.status === "success") {
            setTodos(data.data)

        }
    }


    return (
        <div className='home-page'>
            <div className='home-page--todo'>
                <p>Todo</p>
                <Tasks data={todos.todo} fetchTodos={fetchedData} next="inProgress" />
            </div>
            <div className='home-page--inProgress'>
                <p>InProgress</p>
                <Tasks data={todos.inProgress} fetchTodos={fetchedData} next="review" back="todo" />
            </div>
            <div className='home-page--review'>
                <p>Review</p>
                <Tasks data={todos.review} fetchTodos={fetchedData} next="done" back="inProgress" />
            </div>
            <div className='home-page--done'>
                <p>Done</p>
                <Tasks data={todos.done} fetchTodos={fetchedData} back="review" />
            </div>
        </div>
    );
};

export default HomePage;