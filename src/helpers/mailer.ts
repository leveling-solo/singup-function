import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail: any = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }
    var tranport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: "random@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email " : "Reset Your password",
      html: `${
        emailType === "VERIFY"
          ? `<p>Click 
      <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
      here
      </a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or Copy and paste the link below in  your browser . <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`
          : `<p>Click 
      <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">
      here
      </a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or Copy and paste the link below in  your browser . <br> ${
        process.env.DOMAIN
      }/resetPassword?token=${hashedToken}
      </p>`
      }`,
    };
    const mailresponse = await tranport.sendMail(mailOptions);

    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
