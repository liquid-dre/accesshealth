// Reserved endpoint for future image uploads (Supabase/Cloudinary/UploadThing)
// For now returns 501 to show it's intentionally not implemented yet.
import { NextResponse } from "next/server";

export async function POST() {
	return new NextResponse("Uploads not enabled yet.", { status: 501 });
}
