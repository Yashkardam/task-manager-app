import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await API.get("/auth/me"); // verify cookie
                setIsAuth(true);
            } catch (err) {
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // ⛔ prevent rendering until check is done
    if (loading) return <p>Checking authentication...</p>;

    // 🔐 redirect if not logged in
    if (!isAuth) return <Navigate to="/" replace />;

    return children;
}

export default ProtectedRoute;