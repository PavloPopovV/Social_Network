import { Router } from "express";
import { AuthController } from "../controllers/index.js";

const router = Router();

router.post("/register", AuthController.registration);
router.post("/login", AuthController.login);

export default router;