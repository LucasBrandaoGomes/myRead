import * as readsRepository from '../repositories/readsRepository'
import { UserBookInsertData } from '../types/userBookType';
import { checkIfBookRegistered } from './utils/checkBookRegistered';

async function checkUniqueUserBook(userId: number, bookId:number) {
    const result = await readsRepository.findUniqueUserBook(userId, bookId)
    if(result){
        throw { code: "Conflict", message: `User already reading this book`}
    }
}

export async function inserRead(data:UserBookInsertData) : Promise <void>{
    await checkIfBookRegistered(data.bookId)
    await checkUniqueUserBook(data.userId, data.bookId)
    
    await readsRepository.insertNewRead(data)
}