import { NextResponse } from "next/server";
import attendence from "@/models/attendence";
import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "token invalid" }, { status: 400 });
    }

    const decoded = Jwt.verify(token, process.env.JWT_KEY!) as {
      id: string;
    };

    const userID = decoded.id;

    const getAttendence = await attendence.find({ employee: userID });

    return NextResponse.json(
      { messgae: "attendence return", data: getAttendence },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ messgae: "backend problem" }, { status: 500 });
  }
}
