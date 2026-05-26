import nodemailer from "nodemailer";
import { SendMailOptions } from "./mail.types";
import {
  resetPasswordTemplate,
  verificationEmailTemplate,
} from "./mail.templates";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),

  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function verifyMailConfig() {
  await transporter.verify();

  console.log("SMTP connecté");
}

export const mailService = {
  send: async ({ to, subject, html }: SendMailOptions) => {
    console.log({
      host: process.env.SMTP_HOST,

      port: process.env.SMTP_PORT,

      user: process.env.SMTP_USER,
    });
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });
  },

  sendVerificationEmail: async (email: string, token: string) => {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Validation de votre compte",
      html: verificationEmailTemplate(token),
    });
  },

  sendResetPasswordEmail: async (email: string, token: string) => {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Réinitialisation du mot de passe",
      html: resetPasswordTemplate(token),
    });
  },
};
