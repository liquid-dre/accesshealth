import { NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { ClientSecretCredential } from "@azure/identity";
import type { Message } from "@microsoft/microsoft-graph-types";

export async function POST(req: Request) {
	try {
		const data = await req.json();
		const { name, email, phone, message } = data;

		const credential = new ClientSecretCredential(
			process.env.MS_TENANT_ID!,
			process.env.MS_CLIENT_ID!,
			process.env.MS_CLIENT_SECRET!
		);

		const authProvider = new TokenCredentialAuthenticationProvider(credential, {
			scopes: ["https://graph.microsoft.com/.default"],
		});

		const client = Client.initWithMiddleware({ authProvider });

		const mail: Message = {
			subject: `New contact form submission from ${name}`,
			body: {
				contentType: "html",
				content: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="margin-bottom: 16px; color: #0863C5;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#0863C5;">${email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${phone}" style="color:#0863C5;">${phone}</a></p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
      <p style="white-space: pre-line;">${message}</p>
    </div>
  `,
			},
			toRecipients: [
				{
					emailAddress: {
						address: process.env.CONTACT_TO,
					},
				},
			],
		};

		await client
			.api(`/users/${process.env.MS_USER_ID}/sendMail`)
			.post({ message: mail });

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("CONTACT_FORM_ERROR", error);
		return NextResponse.json(
			{ ok: false, error: "Failed to send message" },
			{ status: 500 }
		);
	}
}
