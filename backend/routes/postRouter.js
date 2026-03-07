import express from "express";
import multer from "multer";
import path from "path";
import { createPost, getPosts, getUserPosts } from "../controllers/postController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/posts/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Routes
router.get("/", getPosts);
router.post("/", isAuthorized, upload.single("image"), createPost);
router.get("/user/:userId", getUserPosts);

export default router;
