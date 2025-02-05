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
                    // console.log("No access token found, setting role to null");
                    setRole(null);
                    setLoading(false);
                    return;
                }

                const response = await getOneUser();

                // console.log("User data fetched:", response);
                setRole(response?.message?.role || null);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setRole(null);
            } finally {
                // console.log("Authentication check finished.");
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);


    return <AuthContext.Provider value={{ role, loading }}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children, admin = false }) => {
    const { role, loading } = useContext(AuthContext);
    console.log("Current role:", role);
    console.log("Loading state:", loading);

    if (loading) return null;

    if (admin && role !== "admin") return <Navigate to="/" replace />;
    if (!admin && !role) return <Navigate to="/login" replace />;

    return children;
};




export { AuthProvider, AuthContext, ProtectedRoute };
