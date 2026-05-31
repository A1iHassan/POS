import axios from "axios";

export const productsApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "https://pos-avnr.onrender.com/api/v1/products",
    headers: { "Content-Type": "application/json" }
})
