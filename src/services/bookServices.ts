import { Books } from '@prisma/client';
import * as bookRepository from '../repositories/bookRepository'

export async function getBooks () : Promise < Books [] >{
    const restult = await bookRepository.findAllBooks()
    return restult
}