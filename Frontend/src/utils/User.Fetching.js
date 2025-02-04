import axios from "axios";
import { toast } from "react-toastify";

export const getOneUser = async () => {
    try {
        const response = await axios.get("/api/v1/users/getUserProfile");
        return response.data;
    } catch (err) {
        console.error("Error fetching profile:", err);
        return null;
    }
};

export const getAllUser = async () => {
    try {
        const response = await axios.get("/api/v1/users/allUsers");
        return response.data;
    } catch (err) {
        console.error("Error fetching profile:", err);
        return [];
    }
};

export const Logout = async () => {
    try {
        const response = await axios.post("/api/v1/users/logoutUser");
        if (response.status === 200) {
            localStorage.clear();
            toast.success("Logged out successfully.");
            window.location.href = "/";
        }
    } catch {
        toast.error("Failed to log out. Please try again.");
    }
};
