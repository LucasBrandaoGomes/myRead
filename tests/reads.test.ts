import supertest from "supertest";
import app from "../src/app";
import { prisma }  from "../src/database/database";
import jwt from 'jsonwebtoken'
import { createNewUser } from "../factories/userFactory";
import * as readsRepository from '../src/repositories/readsRepository'

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "userBook" RESTART IDENTITY`
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`
})

describe("Test route POST /books/reads/:id", () => {
    it("Register a new book reading, return status 201",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        const bookId = 4
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        const userId = jwt.verify(signin.text, process.env.JWT_SECRET);
        const result = await supertest(app).post(`/books/reads/${bookId}`).set('Authorization', 'Bearer ' + signin.text)

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
        await supertest(app).post(`/books/reads/${bookId}`).set('Authorization', 'Bearer ' + signin.text)
        const result = await supertest(app).post(`/books/reads/${bookId}`).set('Authorization', 'Bearer ' + signin.text)

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
       
        const result = await supertest(app).post(`/books/reads/${bookId}`)
        
        expect(result.status).toBe(401)
    })
})

describe("Test route PUT /books/reads/:id", () => {
    it("Update read pages, return status 200",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        const bookId = 4
        const readPages = {readPages:50}
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        const userId = jwt.verify(signin.text, process.env.JWT_SECRET);
        await supertest(app).post(`/books/reads/${bookId}`).set('Authorization', 'Bearer ' + signin.text)
        
        const result = await supertest(app).put(`/books/reads/${bookId}`).send(readPages).set('Authorization', 'Bearer ' + signin.text)
        const newValue = await readsRepository.findUniqueUserBook(Number(userId), bookId)

        expect(result.status).toBe(200)
        expect(newValue.readPages).toEqual(readPages.readPages)
    })

    it("Update read pages without token, return status 401",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        const bookId = 4
        const readPages = {readPages:50}
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        await supertest(app).post(`/books/reads/${bookId}`).set('Authorization', 'Bearer ' + signin.text)
        
        const result = await supertest(app).put(`/books/reads/${bookId}`).send(readPages)

        expect(result.status).toBe(401)
    })

    it("Trying to update read pages of book that user don't read, return status 404",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        const bookId = 4
        const wrongBookId = 5
        const readPages = {readPages:50}
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        await supertest(app).post(`/books/reads/${bookId}`).set('Authorization', 'Bearer ' + signin.text)
        
        const result = await supertest(app).put(`/books/reads/${wrongBookId}`).send(readPages).set('Authorization', 'Bearer ' + signin.text)

        expect(result.status).toBe(404)
    })

    it("Trying to update read pages with a invalid page value, return status 422",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        const bookId = 4
        const readPages = {readPages:1000}
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        const userId = jwt.verify(signin.text, process.env.JWT_SECRET);
        await supertest(app).post(`/books/reads/${bookId}`).set('Authorization', 'Bearer ' + signin.text)
        
        const result = await supertest(app).put(`/books/reads/${bookId}`).send(readPages).set('Authorization', 'Bearer ' + signin.text)
        const newValue = await readsRepository.findUniqueUserBook(Number(userId), bookId)

        expect(result.status).toBe(422)
        expect(newValue.readPages).toEqual(0)
    })
})

describe("Test route GET /books/reads", () => {
    it("Trying to get list of user reads, return status 200",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send(newLogin);
        const userId = jwt.verify(signin.text, process.env.JWT_SECRET);

        const result = await supertest(app).get('/books/reads').set('Authorization', 'Bearer ' + signin.text)
        
        const bookList = await readsRepository.findUserReads(Number(userId))

        expect(result.status).toBe(200)
        expect(bookList).toBeInstanceOf(Array)
    })

    it("Trying to get list of user reads, without token, return status 401",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        await supertest(app).post('/sign-up').send(newUser);
        await supertest(app).post('/sign-in').send(newLogin);
        const result = await supertest(app).get('/books/reads')

        expect(result.status).toBe(401)
    })

    it("Trying to get list of user reads, with invalid token, return status 401",async () => {
        const newUser = await createNewUser()
        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        await supertest(app).post('/sign-up').send(newUser);
        await supertest(app).post('/sign-in').send(newLogin);

        const result = await supertest(app).get('/books/reads').set('Authorization', 'Bearer ' + 'Inavlid token')
        
        expect(result.status).toBe(401)
    })
})

afterAll( async () => {
    await prisma.$disconnect()
})