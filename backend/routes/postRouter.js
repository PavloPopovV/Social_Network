import { Router } from "express";
import protectRouter from '../middleware/protectRoute.js'
import { PostController } from "../controllers/index.js";

const router = Router();


router.post("/create", protectRouter, PostController.createPost);
router.get("/", protectRouter, PostController.getAllPosts);
router.get("/:id", protectRouter,  PostController.getPostById);
router.put("/:id", protectRouter, PostController.editPost);
router.delete("/:id", protectRouter, PostController.deletePost);


export default router;