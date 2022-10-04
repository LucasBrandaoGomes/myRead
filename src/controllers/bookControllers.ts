import {query, Request, Response} from "express"
import * as bookServices from "../services/bookServices"

export async function getAllBooks(req:Request, res: Response) {
    if(req.query.search){
        const search = req.query.search
        const result = await bookServices.getBooksBySearch(String(search))
        console.log("antes do else", result)
        return res.status(200).send(result)

    }else{

        
        const result = await bookServices.getBooks()
        console.log("else", result)
        return res.status(200).send(result)
    }
}

export async function getOneBookById(req:Request, res: Response) {
    const bookId = req.params.id
    const result = await bookServices.getBookById(Number(bookId))

    res.status(200).send(result)
}