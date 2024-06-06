import  {Messages} from "@/model/User.model";

export interface ApiResponse{
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  Message?: Array<Messages> 
}