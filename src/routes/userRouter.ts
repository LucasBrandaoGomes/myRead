import { Router } from "express";

import * as schemas from "../schemas/schemas";
import * as controller from "../controllers/userControllers";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";

const userRouter = Router()

userRouter.post('/sign-up', validateSchemaMiddleware(schemas.signUpSchema), controller.signUp)

export default userRouter