import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const incomingToken =
      req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!incomingToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = jwt.verify(incomingToken, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    if (user.role !== "admin" && user.role !== "administrative") {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
