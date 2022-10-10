import { createNewUser } from "../../../factories/userFactory"
import * as userRepository from "../../../src/repositories/userRepository"
import * as userService from '../../../src/services/userServices'
describe('User services', () => {
    it('Test sucecces insert new user ', async () => {
        const newUser = await createNewUser()
        jest.spyOn(userRepository.inserNewUser(newUser.email, newUser.password), 'then').mockImplementationOnce((): any => {} )

        await userService.newUser(newUser.email, newUser.password)

        expect(userService.newUser).toBeCalled();
    })
})