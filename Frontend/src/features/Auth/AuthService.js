import axios from "axios";

export const verifyUser = async () => {
  try {
    const response = await axios.get("/api/v1/users/refreshtoken");
    return response.data;
  } catch (error) {
    console.error("Verification failed:", error);
    return { isVerified: false };
  }
};