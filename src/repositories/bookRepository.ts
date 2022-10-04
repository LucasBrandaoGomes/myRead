import { prisma } from "../database/database";
import { Books } from "@prisma/client";

export async function findAllBooks() : Promise < Books[] > {
    return await prisma.books.findMany()
}

export async function findBookById(id:number) : Promise < Books > {
    return await prisma.books.findUnique({where:{id:id}})
}