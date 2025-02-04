import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { getOneUser } from "./User.Fetching"; 

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken || accessToken === "undefined") {
                    setRole(null);
                    setLoading(false);
                    return;
                }

                const response = await getOneUser();
                // console.log(response.message.role);
                
                setRole(response?.message?.role || null);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setRole(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    return <AuthContext.Provider value={{ role, loading }}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children, admin = false }) => {
    const { role, loading } = useContext(AuthContext);
    if (loading) return null;
    if (admin && role !== "admin") return <Navigate to="/login" />;
    if (!admin && !role) return <Navigate to="/login" />;
    return children;
};

export { AuthProvider, AuthContext, ProtectedRoute };
