import Link from 'next/link';
import { VscListSelection } from "react-icons/vsc"
import { BiMessageSquareAdd } from "react-icons/bi"
import { RxDashboard } from "react-icons/rx"
import { signOut, useSession } from 'next-auth/react';
import { BiLogOut } from "react-icons/bi"
import { BiLogIn } from "react-icons/bi"

const Layout = ({ children }) => {
    const { status } = useSession()
    return (
        <div className='container'>
            <header>
                <p>Botostart Todo App</p>
                {status === "authenticated" ? (<button onClick={() => signOut()}>Log Out <BiLogOut /></button>) : null}
            </header>
            <div className='container--main'>
                <aside>
                    <p>Welcome 👋</p>
                    <ul>
                        <li>
                            <VscListSelection />
                            <Link href="/">Todos</Link>
                        </li>
                        <li>
                            <BiMessageSquareAdd />
                            <Link href="/add-todo">Add Todo</Link>
                        </li>
                        <li>
                            <RxDashboard />
                            <Link href="/profile">profile</Link>
                        </li>
                    </ul>
                </aside>
                <section>{children}</section>
            </div>
        </div>
    );
};

export default Layout;