import axios from "axios";

export const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000/api/v1/auth",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})