import * as readsRepository from '../repositories/readsRepository'
import { UserBookInsertData } from '../types/userBookType';
import { checkIfBookRegistered } from './utils/checkBookRegistered';

async function checkUniqueUserBook(userId: number, bookId:number) {
    const result = await readsRepository.findUniqueUserBook(userId, bookId)
    if(result){
        throw { code: "Conflict", message: `User already reading this book`}
    }
}

async function getUniqueUserBook(userId:number, bookId:number) {
    const read = await readsRepository.findUniqueUserBook(userId, bookId)
    if(read === null){
        throw { code: "NotFound", message: `Book read not registered`}
    }
    return read
}

async function checkIfUpdateValueIsValid( value:number, totalPages: number,) {
    if(value<=0 || value>totalPages){
        throw { code: "Invalid", message: `Invalid page value`}
    }
}

export async function inserRead(data:UserBookInsertData) : Promise <void>{
    await checkIfBookRegistered(data.bookId)
    await checkUniqueUserBook(data.userId, data.bookId)

    await readsRepository.insertNewRead(data)
}

export async function updateRead(userId:number, bookId: number, readPages:number) {
    const book = await checkIfBookRegistered(bookId)
    const read = await getUniqueUserBook(userId, bookId)
    await checkIfUpdateValueIsValid(readPages, book.totalPages)

    await readsRepository.updateReadPages(read.id, readPages)
}

export async function getUserReadBooks(userid:number) {
    return await readsRepository.findUserReads(userid)
}