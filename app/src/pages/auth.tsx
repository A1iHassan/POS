import { useState } from "react"
import { Eye, EyeClosed } from "lucide-react"

const Auth = () => {
    const [authState, setAuthState] = useState<"login" | "signup">("login")
    const [showPass, setShowPass] = useState<boolean>(false)

    return <>
        <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
            <label htmlFor="password">Password</label>
            <div>
                <input type={showPass ? "text" : "password"} id="password" />
                <span onClick={() => { setShowPass(prev => !prev) }}>
                    {showPass ? <Eye size={20} /> : <EyeClosed size={20} />}
                </span>
            </div>
            <button>{authState}</button>
            <span onClick={() => {
                authState === "login" ? setAuthState("signup") : setAuthState("login")
            }}>
                {authState === "login" ? "Don't have an account? click to sign up" : "Already have an account? click to log in"}
            </span>
        </form>
    </>
}

export default Auth