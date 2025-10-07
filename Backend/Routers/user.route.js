import { Router } from "express";
import { upload } from "../Middlewares/multer.js"
import { loginUser, registerUser, logutUser, getUserProfile, refreshAccessToken, getAllUsers, getUserById, sendOtp, verifyOtp } from "../Controllers/user.controller.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";


const userRoute = Router();
userRoute.route("/register").post(upload.fields([
    { name: "profilePicture", maxCount: 1 }
]), registerUser)
userRoute.route("/sendotp").post(sendOtp);
userRoute.route("/verifyotp").post(verifyOtp);
userRoute.route("/loginUser").post(loginUser);

//secured route
userRoute.route("/refreshtoken").get(verifyJwt, refreshAccessToken);
userRoute.route("/getUserProfile").get(verifyJwt, getUserProfile);
userRoute.route("/logoutUser").post(verifyJwt, logutUser);
userRoute.route("/allUsers").get(verifyJwt, getAllUsers);
userRoute.route("/getuserbyid/:userid").get(verifyJwt, getUserById);



export { userRoute };