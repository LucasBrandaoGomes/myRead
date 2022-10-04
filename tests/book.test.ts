import { prisma } from "../src/database/database";
import { array } from "joi";
import supertest from "supertest";
import { createNewUser } from "../factories/userFactory";
import app from "../src/app";

describe("Test route GET /books", () => {
    it("Return list of books and return status 200",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        const result = await supertest(app).get('/books').set('Authorization', 'Bearer ' + signin.text)
        const bookList = await prisma.books.findMany()

        expect(result.status).toBe(200)
        expect(bookList).toBeInstanceOf(Array)
    })

    it("Try to get list of books without token, return status 401",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        const result = await supertest(app).get('/books')

        expect(result.status).toBe(401)
    })

    it("Try to get list of books without token, return status 401",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        const result = await supertest(app).get('/books').set('Authorization', 'Bearer ' + 'Invalid token')

        expect(result.status).toBe(401)
    })
})