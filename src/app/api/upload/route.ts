import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    const formDataForCloudinary = new FormData();
    formDataForCloudinary.append("file", file);
    formDataForCloudinary.append("upload_preset", "Mikusan");

const uploadResponse = await fetch(                           
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formDataForCloudinary,
      }
    );

    const uploadData = await uploadResponse.json();
    console.log('Upload data:', uploadData); // Log the entire uploadData object

    if (uploadData.secure_url) {
      return NextResponse.json({ url: uploadData.secure_url });
    } else {
      console.error("Upload failed:", uploadData);
      return new NextResponse("Upload failed", { status: 500 });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}