import { NextResponse } from "next/server";
import task from "@/models/task";
import connectDB from "@/lib/mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "unable to fetch token" },
        { status: 400 },
      );
    }

    const decoded = jwt.verify(token?.value, process.env.JWT_KEY!) as {
      id: string;
    };

    const userID = decoded.id;

    const getDocuments = await task.find({ employee: userID });

    return NextResponse.json(
      { message: "task founded", data: getDocuments },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "invalid catch block" },
      { status: 500 },
    );
  }
}
