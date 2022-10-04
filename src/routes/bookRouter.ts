import { Router } from "express";

import * as schemas from "../schemas/schemas";
import * as controller from "../controllers/bookControllers";
import {checkAuthentication} from '../middlewares/tokenValidationMiddleware'

const bookRouter = Router()

bookRouter.get('/books', checkAuthentication , controller.getAllBooks)

export default bookRouter