// src/app/api/contact/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // 
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    //  
    const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_HOST || !EMAIL_PORT) {
      console.error("Missing email environment variables");
      return NextResponse.json(
        { error: "Email configuration error. Please contact support." },
        { status: 500 },
      );
    }

    // Nodemailer transporter 
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT),
      secure: EMAIL_PORT === "465",  
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    // 
    const mailOptions = {
      from: `"${name}" <${EMAIL_USER}>`, 
      to: EMAIL_USER,
      subject: `HERO-KidZ Contact Form: ${subject}`,
      replyTo: email,  
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #ec4899; border-bottom: 2px solid #fce7f3; padding-bottom: 10px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 10px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #64748b; font-size: 12px;">Sent from Hero Kidz Contact Form</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}
