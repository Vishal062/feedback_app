import resend from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  // this promise will return APIResponse
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry message | verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Message send successfully" };
  } catch (emailError) {
    console.error("Error sending verification mail", emailError);
    return { success: false, message: "Failed to send verfication email" };
  }
}
