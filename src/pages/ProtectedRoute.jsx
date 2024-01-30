import { useNavigate } from "react-router";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";


function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate("/");

    }, [navigate, isAuthenticated])

    return isAuthenticated ? children : null;
}

export default ProtectedRoute;
