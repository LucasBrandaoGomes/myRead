import { Request, Response} from "express"
import * as readsServices from "../services/readsServices"
import { UserBookInsertData } from "../types/userBookType"

export async function newRead(req:Request, res: Response) {
    const userId = res.locals.userId
    const bookId = req.params.id
    const data = { userId: Number(userId), bookId: Number(bookId), readPages:0}

    await readsServices.inserRead(data)

    res.sendStatus(201)
}