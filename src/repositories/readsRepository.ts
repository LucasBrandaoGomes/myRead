import { UserBook } from "@prisma/client";
import { prisma } from "../database/database";
import { UserBookInsertData } from "../types/userBookType";

export async function insertNewRead(data: UserBookInsertData) {
    await prisma.userBook.create({data})
}
export async function findUniqueUserBook(userId:number, bookId:number) : Promise < void | UserBook > {
    const result = await prisma.userBook.findUnique(
        {where: 
            {userId_bookId: {
                userId: userId,
                bookId: bookId
                },
            },
        },
    )
    return result
}