import { Router } from "express";
import {
    createpost,
    deletepost,
    editpost,
    getAllPosts,
    getPostById
} from "../Controllers/post.controller.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.js";
import { rateLimit } from "express-rate-limit";

const router = Router();

// Rate Limiting to prevent scraping
const postLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 30, // Max 30 requests per 10 min per IP
    message: "Too many requests, try again later.",
});

// Route for creating a post (Only for logged-in users)
router.route("/createpost").post(
    verifyJwt,
    upload.fields([{ name: "image", maxCount: 1 }]),
    createpost
);

// Route for editing a post (Only for logged-in users)
router.route("/editpost/:id").put(
    verifyJwt,
    upload.single("image"),
    editpost
);

// Route to get a single post (Public)
router.route("/getpostbyid/:id").get(getPostById);

// Route to delete a post (Only for admin users)
router.route("/deletepost/:id").delete(verifyJwt, deletepost);

// Route to get all posts (Public, with rate limiting)
router.route("/getallposts").get(postLimiter, getAllPosts);

export { router as postRouter };
