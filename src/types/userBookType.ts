import { UserBook } from "@prisma/client";

export type UserBookInsertData = {userId: number, bookId: number, readPages:number}

export type UserBookBodyData = {userId: string, bookId:string}