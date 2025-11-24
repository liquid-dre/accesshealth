import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@accesshealth.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function verifyAdmin(email: string, password: string): Promise<boolean> {
	return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export async function createAdminSession() {
	const cookieStore = await cookies();
	cookieStore.set("admin_session", "authenticated", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 7, // 7 days
	});
}

export async function getAdminSession(): Promise<boolean> {
	const cookieStore = await cookies();
	const session = cookieStore.get("admin_session");
	return session?.value === "authenticated";
}

export async function deleteAdminSession() {
	const cookieStore = await cookies();
	cookieStore.delete("admin_session");
}

