// Middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { User } from "../Models/user.model.js";
import { ApiError } from "../Utils/apiError.util.js";

export const verifyJwt = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        console.error("❌ No Token Provided");
        throw new ApiError(401, "Unauthorized request");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        console.error("❌ JWT Verification Failed:", error.message);
        throw new ApiError(401, "Invalid Access Token");
    }

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
        console.error("❌ No User Found for This Token");
        localStorage.removeItem("accessToken");
        throw new ApiError(401, "Invalid Access Token");

    }

    req.user = user;
    next();
});

