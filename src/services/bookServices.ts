import { Books } from '@prisma/client';
import * as bookRepository from '../repositories/bookRepository'

async function checkIfBookRegistered(id:number){
    const result = await bookRepository.findBookById(id)
    if(result === null){
        throw { code: "NotFound", message: "Book not found"}
    }
    return result
}

export async function getBooks () : Promise < Books [] >{
    const result = await bookRepository.findAllBooks()
    return result
}

export async function getBookById (bookId: number) : Promise < Books >{
    const result = checkIfBookRegistered(bookId)
    return result
}