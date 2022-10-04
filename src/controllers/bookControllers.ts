import {Request, Response} from "express"
import * as bookServices from "../services/bookServices"

export async function getAllBooks(req:Request, res: Response) {

    const result = await bookServices.getBooks()

    res.status(200).send(result)
}