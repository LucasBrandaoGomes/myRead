import { Books } from '@prisma/client';
import * as bookRepository from '../repositories/bookRepository'

async function checkIfBookRegistered(id:number){
    const result = await bookRepository.findBookById(id)
    if(result === null){
        throw { code: "NotFound", message: "Book not found"}
    }
    return result
}

async function checkIfBookSearchExist(search:string){
    const result = await bookRepository.findAllBooksBySearch(search)
    if(result === null){
        throw { code: "NotFound", message: `There is no book or author with ${search}`}
    }
    return result
}

export async function getBooks () : Promise < Books [] >{
    const result = await bookRepository.findAllBooks()
    return result
}

export async function getBooksBySearch(search:string) : Promise <Books | Books[]>{
    const result = await checkIfBookSearchExist(search)
    return result
}

export async function getBookById (bookId: number) : Promise < Books >{
    const result = checkIfBookRegistered(bookId)
    return result
}