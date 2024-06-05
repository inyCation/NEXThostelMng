import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();
        const { email, message } = reqBody;

        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api",
                pass: "d810495dd15f6b119f791749b90d0b1a"
            }
        });

        const info = {
            from: "nexthostel@gmail.com",
            to: email,
            subject: "Hello ✔",
            text: message,
            html: `<b>${message}</b>`,
        };

        await transport.sendMail(info);
        console.log("Message sent:", info);

        const data = { message: 'Email sent successfully'};
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email" });
    }
}
