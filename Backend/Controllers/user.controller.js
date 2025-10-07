import { User } from "../Models/user.model.js"
import { asyncHandler } from "../Utils/asyncHandler.util.js"
import { ApiError } from "../Utils/apiError.util.js"
import { ApiResponse } from "../Utils/apiResponse.util.js"
import { uploadOnCloudinary } from "../Utils/cloudiny.util.js"
import { sendemail } from "../Middlewares/emailVerification.js"
import { Option } from "../Utils/option.util.js"
import jwt from "jsonwebtoken"
import { Otp } from "../Models/otp.model.js"


const generateAccessRefreshToken = async (userId) => {

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };

};

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body
    if ([name, email, password, phone].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new ApiError(400, "Email already exists")
    }

    const localFilePath = req.files?.profilePicture[0]?.path;
    if (!localFilePath) {
        throw new ApiError(400, "Profile picture is required")
    }

    const profilePictureUrl = await uploadOnCloudinary(localFilePath);

    if (!profilePictureUrl) {
        return res.status(500).json({ message: "Failed to upload profile picture" });
    }
    const user = await User.create({
        name,
        email,
        password,
        phone,
        profilePicture: profilePictureUrl,
    });


    res.status(201).json(
        new ApiResponse(201, "User created successfully", { userId: user._id })
    );

})

const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await Otp.create({
        otp,
        email,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    });

    const subject = "Your OTP for NewsApp Registration";
    const html = `
        <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 40px; color: #333;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <h2 style="text-align: center; color: #2563eb;">🔐 Email Verification - TechSphere</h2>
            <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
            <p style="font-size: 16px; line-height: 1.6;">
                Thank you for signing up with <b>TechSphere</b>. To complete your registration, please use the OTP code below:
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="display: inline-block; background: #2563eb; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 5px; padding: 15px 25px; border-radius: 8px;">
                ${otp}
                </span>
            </div>
            <p style="font-size: 15px; line-height: 1.6; color: #555;">
                ⚠️ This OTP is valid for only <b>5 minutes</b>. Please do not share it with anyone.
            </p>
            <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;" />
            <p style="font-size: 14px; color: #777; text-align: center;">
                If you didn’t request this verification, you can safely ignore this email.
            </p>
            <p style="font-size: 14px; color: #555; text-align: center; margin-top: 20px;">
                – The <b>TechSphere Team</b>
            </p>
            </div>
        </div>
    `;


    await sendemail(email, subject, html);

    return res
        .status(200)
        .json(new ApiResponse(200, { message: "OTP sent successfully", email }));
});

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const otpDoc = await Otp.findOne({ email, otp });
        if (!otpDoc) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (otpDoc.otpExpiry < new Date()) {
            await Otp.deleteOne({ email });
            return res.status(400).json({ message: "OTP expired" });
        }

        await Otp.deleteOne({ email });
        return res.status(200).json({ success: true, message: "OTP verified" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error verifying OTP" });
    }
};


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);


    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "Failed to generate tokens");
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, Option)  // Set cookies first
        .cookie("refreshToken", refreshToken, Option)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});

const logutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .clearCookie("accessToken", Option)
        .clearCookie("refreshToken", Option)
        .json(new ApiResponse(200, "User logged out successfully"))
})

const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, "User profile retrieved", user));
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password")

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const { accessToken, newRefreshToken } = await generateAccessRefreshToken(user._id);
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        };
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { user }, "Access token refreshed"));
    } catch (error) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find().select("-password -refreshToken");
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch users", error: error.message });
    }
});


const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.userid;
    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const user = await User.findById(userId).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});


export {
    registerUser,
    loginUser,
    sendOtp,
    verifyOtp,
    logutUser,
    getUserProfile,
    refreshAccessToken,
    getAllUsers,
    getUserById
}