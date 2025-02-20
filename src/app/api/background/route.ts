import { ImageSource, removeBackground } from "@imgly/background-removal-node";
import { NextResponse } from "next/server";

/* Remove background */
export async function POST(request: Request) {
  const data = await request.formData();
  const image = data.get("image") as ImageSource;

  try {
    const processedImg = await removeBackground(image);

    return new NextResponse(processedImg, {
      headers: { "Content-Type": "image/png" },
      status: 200,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Something wrong happened. Please try again.",
      },
      { status: 500 }
    );
  }
}
