import { NextResponse } from "next/server";
import attendence from "@/models/attendence";
import connectDB from "@/lib/mongoose";

export async function GET(request: Request) {
  await connectDB();

  try {
    const today = new Date();

    const startDay = new Date(today);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(today);
    endDay.setHours(23, 59, 59, 999);

    const getAttendence = await attendence.findOne({
      createdAt: {
        $gte: startDay,
        $lte: endDay,
      },
    });

    return NextResponse.json(
      { message: "attendence getted", attendence: getAttendence },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error by backend" }, { status: 500 });
  }
}
