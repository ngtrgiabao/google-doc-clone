import Mail from "nodemailer/lib/mailer";
import transporter from "../config/smtp.config";

class MailService {
  public sendMail = async (mailOption: Mail.Options) => {
    await transporter.sendMail(mailOption);
  };
}

const mailService = new MailService();

export { mailService };
