import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const incomingToken =
      req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    console.log("🔹 Incoming Token:", incomingToken);

    if (!incomingToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify JWT
    try {
      const decodedToken = jwt.verify(incomingToken, process.env.JWT_SECRET);
      console.log("🔹 Decoded Token:", decodedToken);
    } catch (error) {
      console.error("❌ JWT Verification Failed:", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    const decodedToken = jwt.verify(incomingToken, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    console.log("🔹 User Found:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    if (user.role !== "admin" && user.role !== "administrative") {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Token Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};


