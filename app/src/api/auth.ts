import axios from "axios";

export const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "https://pos.roarisolutions.com/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})
