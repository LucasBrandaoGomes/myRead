import supertest from "supertest";
import app from "../src/app";
import { prisma }  from "../src/database/database";
import jwt from 'jsonwebtoken'
import { createNewUser } from "../factories/userFactory";
import * as readsRepository from '../src/repositories/readsRepository'


beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "userBook" RESTART IDENTITY`
})

describe("Test route POST /books/reads", () => {
    it("Register a new book reading, return status 201",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        const bookId = 2
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        const userId = jwt.verify(signin.text, process.env.JWT_SECRET);
        const result = await supertest(app).post(`/books/reads`).send({userId:userId, bookId:String(bookId)}).set('Authorization', 'Bearer ' + signin.text)

        const userRead = await readsRepository.findUniqueUserBook(Number(userId), bookId)

        expect(result.status).toBe(201)
        expect(userRead).not.toBe(null)
    })

    it("Trying to register a book reading already registered by user, return status 409",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        const bookId = 2
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        const userId = jwt.verify(signin.text, process.env.JWT_SECRET);
        await supertest(app).post(`/books/reads`).send({userId:userId, bookId:String(bookId)}).set('Authorization', 'Bearer ' + signin.text)
        const result = await supertest(app).post(`/books/reads`).send({userId:userId, bookId:String(bookId)}).set('Authorization', 'Bearer ' + signin.text)

        expect(result.status).toBe(409)
    })

    it("Trying to register new book reading, without token, return status 401",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        const bookId = 2
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        const userId = jwt.verify(signin.text, process.env.JWT_SECRET);
       
        const result = await supertest(app).post(`/books/reads`).send({userId:userId, bookId:String(bookId)})
        
        expect(result.status).toBe(401)
    })

    
})


afterAll( async () => {
    await prisma.$disconnect()
})