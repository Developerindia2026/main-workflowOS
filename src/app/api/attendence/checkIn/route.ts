import attendence from "@/models/attendence";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { latitude, longitude } = await request.json();

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return NextResponse.json(
      { Message: "please give a valid latitude and longitude" },
      { status: 400 },
    );
  }

  try {
    // FIND USER

    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ messgae: "token not found" }, { status: 400 });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY!) as {
      id: string;
    };

    const userID = decode.id;

    if (!userID) {
      return NextResponse.json(
        { message: "user id not founded" },
        { status: 400 },
      );
    }

    // FIND THE EXISTING ATTENDENCE OR NOT

    const today = new Date();

    const startDay = new Date(today);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(today);
    endDay.setHours(23, 59, 59, 999);

    const existingUser = await attendence.findOne({
      employee: userID,
      createdAt: {
        $gte: startDay,
        $lte: endDay,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "user already logined in the portal no re login issued",
          attendence: existingUser,
        },
        { status: 409 },
      );
    }

    // adding new first user

    const addCheckIn = await attendence.create({
      employee: userID,
      date: today,
      checkIn: {
        time: today,
        location: {
          longitude: longitude,
          latitude: latitude,
        },
      },
      status: "present",
      workingTime: 0,
    });

    return NextResponse.json(
      { message: "checkin Successfully done", attendence: addCheckIn },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "invalid" }, { status: 500 });
  }
}
