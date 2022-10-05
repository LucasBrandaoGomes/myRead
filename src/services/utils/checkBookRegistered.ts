import * as bookRepository from '../../repositories/bookRepository'

async function checkIfBookRegistered(id:number){
    const result = await bookRepository.findBookById(id)
    if(result === null){
        throw { code: "NotFound", message: "Book not found"}
    }
    return result
}

export { checkIfBookRegistered }