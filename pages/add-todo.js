import React from 'react';
import AddTodoPage from '../components/template/AddTodoPage';
import { getSession } from 'next-auth/react';

const AddTodo = () => {
    return (
        <AddTodoPage />
    );
};

export default AddTodo;

export async function getServerSideProps(ctx) {
    const session = await getSession({ req: ctx.req })

    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false
            }
        }
    }

    return {
        props: {
            data: null
        }
    }
}