import { Router } from "express";
import {
    createpost,
    deletepost,
    editpost,
    getAllPosts,
    getPostById,
    getPostsByCategory,
    deleteAllPosts,
    waitherInformation,
    getPostsByTag
} from "../Controllers/post.controller.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.js";
import { rateLimit } from "express-rate-limit";
import { verifyAdmin } from "../Middlewares/admin.middleware.js";

const router = Router();

const postLimiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max:100,
    message: "Too many requests, try again later.",
});

router.route("/createpost").post(
    verifyJwt,
    upload.fields([{ name: "image", maxCount: 1 }]),
    createpost
);

router.route("/editpost/:id").put(
    verifyJwt,
    upload.single("image"),
    editpost
);
router.route('/waither').get(waitherInformation)

router.route("/getpostbyid/:id").get(getPostById);
router.route("/getpostbytag/:tag").get(getPostsByTag);
router.route("/getpostbycategory/:category").get(getPostsByCategory);

router.route("/deletepost/:id").delete(verifyJwt, deletepost);

router.route("/getallposts").get(postLimiter, getAllPosts);
// router.route("/deleteAllPosts").get(deleteAllPosts);

export { router as postRouter };
