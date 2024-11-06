import { Router } from "express";
import protectRouter from '../middleware/protectRoute.js'
import { CommentController } from "../controllers/index.js";

const router = Router();

router.post("/create", protectRouter, CommentController.createComment );
router.delete("/:id", protectRouter, CommentController.deleteComment);

export default router;