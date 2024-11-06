import { Router } from "express";
import protectRouter from '../middleware/protectRoute.js'
import { MessagesController } from "../controllers/index.js";

const router = Router();

router.post('/send/:id', protectRouter, MessagesController.sendMessages);
router.get('/:id', protectRouter, MessagesController.getMessages);


export default router;