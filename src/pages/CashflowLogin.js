import { useState } from "react"
import HStack from "../components/HStack"
import VStack from "../components/VStack"
import { signIn } from "../database/db"
import Cashflow from "./Cashflow"
import { FiUser, FiLock, FiUsers } from "react-icons/fi"
import { FaUser } from "react-icons/fa"
import BounceButton from "../components/BounceButton"





const TopBit = () => {
    return (
        <div className="flex font-bold bg-rhaz-minor-grey rounded-t-3xl">
            <div className="w-full p-4 text-center bg-white rounded-t-3xl">Sign In</div>
            <div className="w-full p-4 text-center rounded-bl-3xl rounded-t-3xl">Register</div>
        </div>
    )
}

const EmailInput = ({ setValue }) => {
    return (
        <HStack className="px-6 gap-3 py-2 w-full bg-slate-400 rounded-full bg-rhaz-minor-grey text-rhaz-major-grey">
            <FiUser />
            <input
                className="bg-transparent text-black"
                placeholder="email"
                onChange={(e) => setValue(e.target.value)}>
            </input>
        </HStack>

    )
}

const PasswordInput = ({ setValue }) => {
    return (
        <VStack className={'gap-3'}>
            <HStack className="px-6 py-2 w-full bg-slate-400 rounded-full bg-rhaz-minor-grey text-rhaz-major-grey gap-3" >
                <FiLock />
                <input
                    className="bg-transparent focus:border-debug text-black"
                    type="password"
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="password"
                />
            </HStack>
        </VStack>
    )
}
const SignInForm = ({ setUser }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const signInAndSet = async () => {
        const user = await signIn(email, password)
        setUser(user)
    }
    return (
        <div className="w-screen h-screen bg-rhaz-primary flex items-center justify-center text-rhaz-major-grey">
            <form className=" bg-white rounded-3xl  shadow-xl flex flex-col gap-5">
                <TopBit />
                <div className="flex flex-col justify-center items-center gap-5 p-10 text-black">
                    <div className="w-20 h-20 bg-red-300 rounded-3xl bg-rhaz-minor-grey flex items-center justify-center text-4xl text-rhaz-major-grey">
                        <FaUser />
                    </div>

                    <EmailInput setValue={setEmail} />
                    <PasswordInput setValue={setPassword} />
                    <BounceButton className="bg-rhaz-primary text-white w-1/2 m-2 py-3 rounded-full">
                        <div onClick={(e) => { e.preventDefault(); signInAndSet() }}>Sign In</div>
                    </BounceButton>
                    <BounceButton>
                        <div className="text-rhaz-major-grey">register</div>
                    </BounceButton>

                </div>

            </form>

        </div>

    )

}


const CashflowLogin = () => {
    const [user, setUser] = useState(null)

    return (
        <div>
            {!user && <SignInForm setUser={setUser} />}
            {user && <Cashflow />}
        </div>
    )

}

export default CashflowLogin;
