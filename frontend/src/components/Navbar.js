import API from "../services/api";

function Navbar() {
    const logout = async () => {
        await API.post("/auth/logout");
        window.location.href = "/";
    };

    return (
        <div style={{
            background: "#333",
            color: "white",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <h3>Task Manager</h3>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Navbar;