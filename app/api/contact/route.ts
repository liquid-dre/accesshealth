import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const data = await req.json();
	// TODO: send to your inbox, Slack, or CRM
	// Example: call Resend/Mailgun here
	console.log("CONTACT_FORM_SUBMISSION", data);
	return NextResponse.json({ ok: true });
}
