import { NextResponse } from "next/server";
import { verifyAdmin, createAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json();

		const isValid = await verifyAdmin(email, password);

		if (!isValid) {
			return NextResponse.json(
				{ success: false, error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		await createAdminSession();

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ success: false, error: "Login failed" },
			{ status: 500 }
		);
	}
}

