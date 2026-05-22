import axios from "axios";

export const productsApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000/api/v1/products",
    headers: { "Content-Type": "application/json" }
})
