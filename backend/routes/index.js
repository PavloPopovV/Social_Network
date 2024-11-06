import { Router } from "express";
import authRouter from './authRouter.js'
import userRouter from './userRouter.js'
import postRouter from './postRouter.js'
import commentRouter from './commentRouter.js'
import likeRouter from './likeRouter.js'
import followRouter from './followRouter.js'
import messagesRouter from './messagesRouter.js'
import conversationRouter from './conversationRouter.js'


const router = Router();
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/likes", likeRouter);
router.use("/users", followRouter);
router.use("/messages", messagesRouter);
router.use("/conversation", conversationRouter);

export default router;