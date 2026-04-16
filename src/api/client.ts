import { API_BASE_URL, BACKEND_SERVER, MOCK_API_ON } from "@/config";
import axios from "axios";

const api = axios.create({
    baseURL: MOCK_API_ON ? API_BASE_URL : `${BACKEND_SERVER}${API_BASE_URL}`, // 🔁 change to your backend
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔐 Attach token automatically
api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

// 🚪 Auto logout on 401 (optional, can inject later)
export default api;