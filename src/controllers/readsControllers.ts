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

export async function updateBookRead(req:Request, res: Response) {
    const userId = res.locals.userId
    const bookId = req.params.id
    const { readPages } = res.locals.body

    await readsServices.updateRead(Number(userId),Number(bookId), Number(readPages))

    res.sendStatus(200)
}

export async function getUserReads(req:Request, res: Response) {
    const userId = res.locals.userId

    const result =  await readsServices.getUserReadBooks(Number(userId))

    res.status(200).send(result)
}