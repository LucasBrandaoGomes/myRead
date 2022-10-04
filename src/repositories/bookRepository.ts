import { prisma } from "../database/database";
import { Books } from "@prisma/client";

export async function findAllBooks() : Promise < Books[] > {
    return await prisma.books.findMany()
}