"use server";

import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

export interface Email {
  to: string;
  subject: string;
  body: string;
}

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_EMAIL_PASSWORD,
  },
});

export async function sendEmail(email: Email) {
  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: email.to,
    subject: email.subject,
    text: email.body,
  };

  const result = await transport.sendMail(mailOptions);
  if (result.rejected.length > 0) {
    throw new Error("Email failed to send");
  }

  return;
}
