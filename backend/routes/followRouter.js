import { Router } from "express";
import protectRouter from '../middleware/protectRoute.js'
import { FollowController } from "../controllers/index.js";

const router = Router();

router.post("/:id", protectRouter, FollowController.followUser);
router.delete("/:id", protectRouter, FollowController.unFollowUser);
router.get("/follows/:id", protectRouter, FollowController.getUserFollows);

export default router;