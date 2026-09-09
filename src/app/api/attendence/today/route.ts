import { NextResponse } from "next/server";
import attendence from "@/models/attendence";
import connectDB from "@/lib/mongoose";
import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  await connectDB();

  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    const decoded = Jwt.verify(token.value, process.env.JWT_KEY!) as {
      id: string;
    };

    if (!decoded?.id) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 },
      );
    }

    const userID = decoded.id;

    // Start of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // End of today
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Get ONLY today's attendance
    const getAttendence = await attendence
      .findOne({
        employee: userID,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .populate("employee");

    return NextResponse.json(
      {
        message: "Today's attendance returned",
        data: getAttendence,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Attendance GET error:", error);

    return NextResponse.json({ message: "Error by backend" }, { status: 500 });
  }
}
