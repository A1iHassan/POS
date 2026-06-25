import axios from "axios";

export const productsApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "https://pos.roarisolutions.com/api/v1",
    headers: { "Content-Type": "application/json" }
})
