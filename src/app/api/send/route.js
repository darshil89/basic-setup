import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const { subject, message } = body;

 

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "darshilmahraur93@gmail.com",
        pass: process.env.SECRET,
      },
      
    });

    const mailOptions = {
      from: '"Darshil 👻" <darshilmahraur93@gmail.com>',
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
