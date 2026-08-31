import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import annoucement from "@/models/annoucement";

export async function GET(request: Request) {
  await connectDB();

  try {
    const getAnnoucement = await annoucement.find();

    return NextResponse.json(
      { message: "valid request", data: getAnnoucement },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "invalid get request" },
      { status: 500 },
    );
  }
}
