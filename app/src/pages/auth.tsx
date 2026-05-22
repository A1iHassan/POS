import { useState, useRef, type SubmitEvent } from "react"
import { useMutation } from "@tanstack/react-query"
import { Eye, EyeClosed } from "lucide-react"
import { authApi } from "../api/auth"
import { useNavigate } from "react-router-dom"

interface NewUser {
    name: string,
    password: string
}

const Auth = () => {
    const [authState, setAuthState] = useState<"login" | "signup">("login")
    const [showPass, setShowPass] = useState<boolean>(false)
    const [userData, setUserData] = useState<NewUser>({ name: "", password: "" })
    console.log(userData)
    const timeoutRef = useRef(0)
    const navigate = useNavigate()

    const { mutate: createUser } = useMutation({
        mutationFn: async (payload: NewUser) => { await authApi.post("/signup", payload) },
        onSuccess: () => {
            alert("User created successfully ... now you can log in with your new credentials")
            setAuthState("login")
        },
        onError: () => alert("Failed to create user ... try again later")
    })

    const { mutate: logUser } = useMutation({
        mutationFn: async (payload: NewUser) => { await authApi.post("/login", payload) },
        onSuccess: () => navigate("/checkout"),
        onError: () => alert("Failed to authenticate user ... check your credentials")
    })

    return <div className="w-screen h-screen flex gap-3 justify-center items-center">
        <form
            onSubmit={(e: SubmitEvent<HTMLFormElement>) => {
                e.preventDefault()
                authState === "login"
                    ? logUser(userData)
                    : createUser(userData)
            }}
            className="flex flex-col gap-3 justify-center items-center border border-slate-300 p-20 rounded-xl">
            <label htmlFor="name" className=" w-full text-4xl">Name</label>
            <input
                onChange={(e) => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    timeoutRef.current = setTimeout(() => {
                        setUserData(prev => ({ ...prev, name: e.target.value }))
                    }, 500)
                }}
                placeholder="Enter your name"
                type="text" id="name"
                className="mb-10 w-full px-5 py-2 rounded-lg border-2 border-slate-200 focus:border-slate-500 outline-0" />
            <label htmlFor="password" className=" w-full text-4xl">Password</label>
            <div className="flex gap-2 w-full mb-10">
                <input
                    onChange={(e) => {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        timeoutRef.current = setTimeout(() => {
                            setUserData(prev => ({ ...prev, password: e.target.value }))
                        }, 500)
                    }}
                    placeholder="Chose a secure password"
                    type={showPass ? "text" : "password"}
                    id="password"
                    className="px-5 py-2 rounded-lg border-2 border-slate-200 focus:border-slate-500 outline-0" />
                <span onClick={() => { setShowPass(prev => !prev) }} className="cursor-pointer place-self-center hover:bg-slate-200 rounded p-2">
                    {showPass ? <Eye size={20} /> : <EyeClosed size={20} />}
                </span>
            </div>
            <button
                type="submit"
                className="cursor-pointer hover:bg-slate-200 border-2 border-slate-200 focus:border-slate-5000 rounded-lg w-auto px-10 py-1">{authState}</button>
            <span onClick={() => {
                authState === "login" ? setAuthState("signup") : setAuthState("login")
            }} className=" w-full cursor-pointer">
                {authState === "login" ? "Don't have an account? click to sign up" : "Already have an account? click to log in"}
            </span>
        </form>
    </div>
}

export default Auth