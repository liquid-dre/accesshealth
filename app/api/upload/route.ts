// Reserved endpoint for future image uploads (Supabase/Cloudinary/UploadThing)
// For now returns 501 to show it's intentionally not implemented yet.
import { NextResponse } from "next/server";
import { convex } from "@/lib/convex";
import { api } from "@/convex/_generated/api";

const { storageId, url } = await convex.mutation(
  api.images.upload,
  { file }
);

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return new NextResponse("No file uploaded", { status: 400 });
  }

  // Optional validation: limit to 5MB images
  const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return new NextResponse("Invalid file type", { status: 400 });
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return new NextResponse("File too large", { status: 400 });
  }

  const { storageId, url } = await convex.mutation("images:upload", { file });

  return NextResponse.json({ id: storageId, url });
}
