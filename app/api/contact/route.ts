import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
	try {
		const data = await req.json();
		const { name, email, phone, message } = data;

		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_SMTP_HOST,
			port: Number(process.env.EMAIL_SMTP_PORT) || 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_SMTP_USER,
				pass: process.env.EMAIL_SMTP_PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.EMAIL_SMTP_USER,
			to: process.env.CONTACT_TO,
			subject: `New contact form submission from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
		});

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("CONTACT_FORM_ERROR", error);
		return NextResponse.json(
			{ ok: false, error: "Failed to send message" },
			{ status: 500 }
		);
	}
}
