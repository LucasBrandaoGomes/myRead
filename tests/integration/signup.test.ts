import supertest from "supertest";
import app from "../../src/app";
import { prisma }  from "../../src/database/database";
import { createNewUser } from '../../factories/userFactory'

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`
})


describe("Test route POST /sign-up", () => {
    it("Create new user and return status 201",async () => {
        const newUser = await createNewUser()
        const result = await supertest(app).post('/sign-up').send(newUser);
    
        const createdUser = await prisma.users.findUnique({where: {email:newUser.email}});
    
        expect(result.status).toBe(201)
        expect(createdUser).not.toBeNull()
    })

    it("Create new user with email already registered, return status 409",async () => {
        const newUser = await createNewUser()

        await supertest(app).post('/sign-up').send(newUser);
        const result = await supertest(app).post('/sign-up').send(newUser);

        expect(result.status).toBe(409)
    })

    it("Create new user without email, return status 422",async () => {
        const newUser = await createNewUser()

        const result = await supertest(app).post('/sign-up').send({password: newUser.password, paswordConfirmation: newUser.passwordConfirmation});
        
        expect(result.status).toBe(422)
    })

    it("Create new user without password confirmation, return status 422",async () => {
        const newUser = await createNewUser()

        const result = await supertest(app).post('/sign-up').send({email: newUser.email, password: newUser.password});
        
        expect(result.status).toBe(422)
    })

    it("Create new user without password, return status 422",async () => {
        const newUser = await createNewUser()

        const result = await supertest(app).post('/sign-up').send({email: newUser.email, passwordConfirmation: newUser.passwordConfirmation});
        
        expect(result.status).toBe(422)
    })

    it("Create new user with wrong password confirmation, return status 422",async () => {
        const newUser = await createNewUser()

        const result = await supertest(app).post('/sign-up').send({...newUser, passwordConfirmation:"1111"});
        
        expect(result.status).toBe(422)
    })
})

afterAll( async () => {
    await prisma.$disconnect()
})