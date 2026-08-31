import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import user from "@/models/users";

export async function GET(request: Request) {
  await connectDB();

  try {
    const getUser = await user.find();

    return NextResponse.json(
      { message: "user sended to frotnend", user: getUser },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "invalid catch block handled" },
      { status: 500 },
    );
  }
}
