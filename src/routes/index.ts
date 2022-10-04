import { Router } from "express";
import bookRouter from "./bookRouter";
import userRouter from "./userRouter";

const router = Router()

router.use(userRouter);
router.use(bookRouter)

export default router