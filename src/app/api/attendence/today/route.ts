import { NextResponse } from "next/server";
import attendence from "@/models/attendence";
import connectDB from "@/lib/mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  await connectDB();

  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ message: "token not found" }, { status: 400 });
    }

    const decoded = Jwt.verify(token?.value, process.env.JWT_KEY!) as {
      id: string;
    };

    if (!decoded) {
      return NextResponse.json(
        { message: "user not authenticated" },
        { status: 404 },
      );
    }

    const userID = await decoded.id;

    const getAttendence = await attendence.find({ employee: userID });

    return NextResponse.json(
      { message: "attendence return ", data: getAttendence },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error by backend" }, { status: 500 });
  }
}
