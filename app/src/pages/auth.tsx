import { useState } from "react"
import { Eye, EyeClosed } from "lucide-react"

const Auth = () => {
    const [authState, setAuthState] = useState<"login" | "signup">("login")
    const [showPass, setShowPass] = useState<boolean>(false)

    return <div className="w-screen h-screen flex gap-3 justify-center items-center">
        <form className="flex flex-col gap-3 justify-center items-center border border-slate-300 p-20 rounded-xl">
            <label htmlFor="name" className=" w-full text-4xl">Name</label>
            <input type="text" id="name" className="mb-10 w-full px-5 py-2 rounded-lg border-2 border-slate-200 focus:border-slate-500 outline-0" />
            <label htmlFor="password" className=" w-full text-4xl">Password</label>
            <div className="flex gap-2 w-full mb-10">
                <input type={showPass ? "text" : "password"} id="password" className="px-5 py-2 rounded-lg border-2 border-slate-200 focus:border-slate-500 outline-0" />
                <span onClick={() => { setShowPass(prev => !prev) }} className="cursor-pointer place-self-center hover:bg-slate-200 rounded p-2">
                    {showPass ? <Eye size={20} /> : <EyeClosed size={20} />}
                </span>
            </div>
            <button className="cursor-pointer hover:bg-slate-200 border-2 border-slate-200 focus:border-slate-5000 rounded-lg w-auto px-10 py-1">{authState}</button>
            <span onClick={() => {
                authState === "login" ? setAuthState("signup") : setAuthState("login")
            }} className=" w-full cursor-pointer">
                {authState === "login" ? "Don't have an account? click to sign up" : "Already have an account? click to log in"}
            </span>
        </form>
    </div>
}

export default Auth