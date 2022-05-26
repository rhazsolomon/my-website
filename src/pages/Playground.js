import { useState } from "react"
import { signIn } from "../database/db"
import Cashflow from "./Cashflow"

const SignInForm = ({ setUser }) => {
    const signInAndSet = async (email) => {
        const user = await signIn(email, '123456')
        setUser(user)
    }
    return (
        <div className="bg-slate-200 w-1/2 p-4 rounded-md flex flex-col gap-2">
            <button
                className="bg-slate-300 p-2"
                onClick={() => signInAndSet('rhaz.solomon@gmail.com')}
            >Rhaz Solomon</button>
            <button
                className="bg-slate-300 p-2"
                onClick={() => signInAndSet('ben.thunder@test.com')}
            >Ben Thunder</button>

        </div>
    )
}

const Playground = () => {

    const [user, setUser] = useState(null)

    return (
        <div>

            {!user && <SignInForm setUser={setUser} />}
            {user && <Cashflow />}
        </div>
    )
}

export default Playground;