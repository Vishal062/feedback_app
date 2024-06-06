import {z} from 'zod';


export const messageSchema = z.object({
  content: z.string().min(6,{message: 'Content Must be atleast 6 character'})
    .max(300, {message:'Content must be atleast no longer then 300 character'})
});