import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    console.log(API);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/auth/register", form);
        alert("Registered!");
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;