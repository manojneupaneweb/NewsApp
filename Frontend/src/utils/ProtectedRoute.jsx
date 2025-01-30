import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, admin = false }) => {
    const context = useContext(AuthContext);
    if (!context) {
        console.error("AuthContext is undefined. Ensure AuthProvider wraps your routes.");
        return <Navigate to="/login" />;
    }

    const { role } = context;

    if (admin && role !== "admin") return <Navigate to="/login" />;
    if (!admin && !role) return <Navigate to="/login" />;

    return children;
};

export default ProtectedRoute;
