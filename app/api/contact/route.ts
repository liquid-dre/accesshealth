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
				contentType: "text",
				content: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
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
