import { Router } from "express";

import * as schemas from "../schemas/schemas";
import * as controller from "../controllers/readsControllers";
import {checkAuthentication} from '../middlewares/tokenValidationMiddleware'
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";

const readsRouter = Router()

readsRouter.post('/books/reads/:id', checkAuthentication, controller.newRead)
// readsRouter.put('/books/reads:id', checkAuthentication, validateSchemaMiddleware(schemas.uptadeReadSchema), controller.updateRead)

export default readsRouter