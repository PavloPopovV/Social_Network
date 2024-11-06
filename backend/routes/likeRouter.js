import { Router } from "express";
import protectRouter from '../middleware/protectRoute.js'
import { LikeController } from "../controllers/index.js";

const router = Router();

router.post("/:id", protectRouter,LikeController.likePost );
router.delete("/:id", protectRouter, LikeController.unLikePost);

export default router;