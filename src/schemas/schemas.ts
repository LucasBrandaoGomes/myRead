import joi, { number } from 'joi'
import { UserBookBodyData } from '../types/userBookType';
import { UserBodyData, UserSignInBodyData } from '../types/userType';


const signUpSchema = joi.object<UserBodyData>({
    email: joi.string().email().required(),
    password: joi
    .string()
    .required(),
    passwordConfirmation: joi.any().valid(joi.ref('password')).required()
  });

const signInSchema = joi.object<UserSignInBodyData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const uptadeReadSchema = joi.object({
  readPages: joi.number().integer().required()
})

export { signUpSchema, signInSchema, uptadeReadSchema }
