import axios from "axios";
import { toast } from "react-toastify";

export const getOneUser = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken || accessToken === "undefined") return null;

        const response = await axios.get("/api/v1/users/getUserProfile");
        // console.log("Fetched User Data:", response.data);
        return response.data;
    } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err);
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
            axios.defaults.headers.Authorization = null;
            toast.success("Logged out successfully.");
            window.location.href = "/login";
        }
    } catch {
        toast.error("Failed to log out. Please try again.");
    }
};

