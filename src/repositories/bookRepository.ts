import { prisma } from "../database/database";
import { Books } from "@prisma/client";

export async function findAllBooks() : Promise < Books[] > {
    return await prisma.books.findMany()
}

export async function findAllBooksBySearch(search:string) : Promise < Books[] > {
    return await prisma.books.findMany({
        where: {
            OR: [
                {title:{
                    contains: `${search}`,
                    mode: 'insensitive',
                }},
                {author: {
                    contains: `${search}`,
                    mode: 'insensitive',
                }},
                 ],
        }
        
    })
}

export async function findBookById(id:number) : Promise < Books > {
    return await prisma.books.findUnique({where:{id:id}})
}