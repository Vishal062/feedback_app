import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import {z} from 'zod';
import { userNameValidation } from "@/schemas/signUpSchema";


const UsernameQuerySchema = z.object({
  username: userNameValidation
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const {searchParams} = new URL(request.url);
    const queryParam = {
      username: searchParams.get('username')
    };

    // Validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    if(!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json({
        success: false,
        message: usernameErrors?.length > 0 ? usernameErrors.join(',') : 'Invalid query parameters'
      }, {status: 400});
    }

    const {username} = result.data;

    const existingVerifiedUser = await UserModel.findOne({username, isVerified: true});
    
  } catch (error) {
    console.error('Error checking username', error);
    return Response.json(
      {
        success: false,
        message:'Error checking username'
      },
      {status: 500}
    )
  }
}