import { Router } from "express";
import { UserController } from "../controllers/index.js";
import protectRouter from '../middleware/protectRoute.js'

const router = Router();

router.get("/current", protectRouter, UserController.current);
router.get("/:id", protectRouter, UserController.userById);
router.put("/:id", protectRouter, UserController.editUser);
router.get("/", protectRouter, UserController.getUsers);


export default router;