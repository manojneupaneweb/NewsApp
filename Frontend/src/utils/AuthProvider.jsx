import React, { createContext, useState, useEffect } from "react";
import useFetchProfile from "./useFetchProfile";

export const AuthContext = createContext(null); // Ensure context is exported

const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const fetchedRole = useFetchProfile();

    useEffect(() => {
        if (fetchedRole) setRole(fetchedRole);
    }, [fetchedRole]);

    return (
        <AuthContext.Provider value={{ role }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
