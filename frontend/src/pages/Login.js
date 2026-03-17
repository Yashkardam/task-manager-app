import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/login", form);
            navigate("/dashboard");
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message || "Login failed");
            } else {
                alert("Server error");
            }
        }
    };

    return (
        <>
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
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </>
    );
}

export default Login;