import { NextResponse } from "next/server";

/**
 * Reserved endpoint for future image uploads.
 * For now, the route is intentionally not implemented.
 */
export async function POST() {
	return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
