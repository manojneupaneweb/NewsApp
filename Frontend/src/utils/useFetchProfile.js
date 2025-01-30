import { useEffect, useState } from "react";
import axios from "axios";

function useFetchProfile() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("/api/v1/users/getUserProfile");
                setRole(response.data.message.role);
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchProfile();
    }, []);

    return role;
}

export default useFetchProfile;
