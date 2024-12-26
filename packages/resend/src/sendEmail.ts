import { CreateEmailResponseSuccess } from "resend";
import { resend } from "./resend";

type SendEmailArgs = {
  to: string[];
  subject: string;
  html: string;
};

type SendEmailSuccess = {
  success: true;
  data: CreateEmailResponseSuccess;
};

type SendEmailError = {
  success: false;
  error: string;
};

type SendEmailResponse = SendEmailSuccess | SendEmailError;

export const sendEmail = async (
  args: SendEmailArgs
): Promise<SendEmailResponse> => {
  const { data, error } = await resend.emails.send({
    from: "Crypto Alert <notification@crypto-alert.blazu.dev>",
    to: args.to,
    subject: args.subject,
    html: args.html,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data! };
};
