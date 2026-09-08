import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import document from "@/models/document";
import cloudinary from "@/lib/cloudinary";
import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await connectDB();

  try {
    const data = await request.formData();

    const titleData = data.get("title")?.toString();

    const descriptionData = data.get("description")?.toString();

    const file = data.get("file");

    let documentURL = "";

    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();

      const bytes = Buffer.from(arrayBuffer);

      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              folder: "document",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          )
          .end(bytes);
      });

      documentURL = result.secure_url;
    }

    // GET USER
    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "user not founded" },
        { status: 404 },
      );
    }

    const decoded = Jwt.verify(token?.value, process.env.JWT_KEY!) as {
      id: string;
    };

    if (!decoded) {
      return NextResponse.json(
        { message: "authentication failed" },
        { status: 404 },
      );
    }

    const userID = decoded.id;

    const createDocument = await document.create({
      title: titleData,
      description: descriptionData,
      document: documentURL,
      user: userID,
    });

    return NextResponse.json(
      { message: "data successfull", data: createDocument },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "catched blocked  handled" },
      { status: 500 },
    );
  }
}
