import { Router } from "express";
import protectRouter from '../middleware/protectRoute.js'
import { ConversationController } from "../controllers/index.js";

const router = Router();

router.post('/:id', protectRouter, ConversationController.createConversation)
router.get('/:id', protectRouter, ConversationController.getUserConversations)
router.delete('/:id', protectRouter, ConversationController.deleteConversation)

export default router;