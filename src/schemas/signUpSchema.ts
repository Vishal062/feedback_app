import {z} from 'zod';

export const userNameValidation = z
    .string()
    .min(2, 'Username must be atleast two character')
    .max(20, 'Max 20 character only')
    .regex(/^[a-zA-Z0-9]/,'Username must not contain special character')

export const signUpSchema = z.object({
  username:userNameValidation,
  email: z.string().email({message:'Invalid email address'}),
  password: z.string().min(6, {message:'Password must be atleast 6 character'}).max(8)
})