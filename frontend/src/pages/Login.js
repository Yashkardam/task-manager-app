import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/auth/login", form);
        navigate("/dashboard");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;