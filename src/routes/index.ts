import { Router } from "express";
import bookRouter from "./bookRouter";
import readsRouter from "./readsRouter";
import userRouter from "./userRouter";

const router = Router()

router.use(userRouter);
router.use(bookRouter)
router.use(readsRouter)

export default router