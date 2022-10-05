import { Router } from "express";

import * as schemas from "../schemas/schemas";
import * as controller from "../controllers/readsControllers";
import {checkAuthentication} from '../middlewares/tokenValidationMiddleware'
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";

const readsRouter = Router()

readsRouter.post('/books/reads', checkAuthentication, validateSchemaMiddleware(schemas.newReadSchema), controller.newRead)

export default readsRouter