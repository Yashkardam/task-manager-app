import axios from "axios";

const API = axios.create({
    baseURL: "https://task-manager-app-9r26.onrender.com/api",
    withCredentials: true,
});

export default API;