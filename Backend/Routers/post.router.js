import { Router } from "express";
import {
    createpost,
    deletepost,
    editpost,
    getAllPosts,
    getPostById,
    getPostsByCategory,
    deleteAllPosts
} from "../Controllers/post.controller.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.js";
import { rateLimit } from "express-rate-limit";
import { verifyAdmin } from "../Middlewares/admin.middleware.js";

const router = Router();

// Rate Limiting to prevent scraping
const postLimiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max:100,
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
router.route("/getpostbycategory/:category").get(getPostsByCategory);

router.route("/deletepost/:id").delete(verifyAdmin, deletepost);

router.route("/getallposts").get(postLimiter, getAllPosts);
// router.route("/deleteAllPosts").get(deleteAllPosts);

export { router as postRouter };
