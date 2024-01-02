import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const { subject, message } = body;

  console.log(process.env.SECRET);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // `true` for port 465, `false` for all other ports
      auth: {
        user: "deron.leffler@ethereal.email",
        pass: process.env.SECRET,
      },
    });

    const mailOptions = {
      from: '"Hello there 👻" <deron.leffler@ethereal.email>',
      to: "darshilmahraur67@gmail.com",
      subject: `${subject}`,
      text: `${message}`,
      html: `
      <b>${subject}</b>
         <p>${message}</p>
            `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
  }
}
