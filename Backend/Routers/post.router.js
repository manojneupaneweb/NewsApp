import { Router } from "express";
import {
    createpost,
    deletepost,
    editpost,
    getAllPosts,
    getPostByCategory,
    getPostById
} from "../Controllers/post.controller.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.js";
import { rateLimit } from "express-rate-limit";
import { verifyAdmin } from "../Middlewares/admin.middleware.js";

const router = Router();

// Rate Limiting to prevent scraping
const postLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 30, // Max 30 requests per 10 min per IP
    message: "Too many requests, try again later.",
});

router.route("/createpost").post(
    verifyAdmin,
    upload.fields([{ name: "image", maxCount: 1 }]),
    createpost
);

router.route("/editpost/:id").put(
    verifyAdmin,
    upload.single("image"),
    editpost
);

router.route("/getpostbyid/:id").get(getPostById);
router.route("/getpostbycategory/:id").get(getPostByCategory);

router.route("/deletepost/:id").delete(verifyAdmin, deletepost);

router.route("/getallposts").get(postLimiter, getAllPosts);

export { router as postRouter };
