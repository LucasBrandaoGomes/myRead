import * as userRepository from '../repositories/userRepository'
import bcrypt from "bcrypt";

async function checkIfEmailRegistered(email:string) {
    const result = await userRepository.findUserByEmail(email)
    if(result){
        throw { code: "Conflict", message: "Email already registered"}
    }
}


export async function newUser(email:string, password:string) {
    const passwordCript: string = bcrypt.hashSync(password, 10);
    await checkIfEmailRegistered(email);
    await userRepository.inserNewUser(email, passwordCript )
}

