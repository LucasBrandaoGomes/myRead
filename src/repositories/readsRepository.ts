import { UserBook } from "@prisma/client";
import { prisma } from "../database/database";
import { UserBookInsertData } from "../types/userBookType";

export async function insertNewRead(data: UserBookInsertData) : Promise <void> {
    await prisma.userBook.create({data})
}
export async function findUniqueUserBook(userId:number, bookId:number) : Promise < UserBook > {
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

export async function updateReadPages(id:number, value: number) : Promise < void > {
    await prisma.userBook.update({
        where: {
          id: id
        },
        data: {
          readPages: value
        },
      })
}