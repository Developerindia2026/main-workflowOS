import Attendance from "@/models/attendence";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { latitude, longitude } = await request.json();

    // Validate location
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return NextResponse.json(
        {
          message: "Please provide a valid latitude and longitude",
        },
        { status: 400 },
      );
    }

    // Connect database
    await connectDB();

    // Get token
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: "Token not found",
        },
        { status: 401 },
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY!) as {
      id: string;
    };

    const userID = decoded.id;

    if (!userID) {
      return NextResponse.json(
        {
          message: "User ID not found",
        },
        { status: 401 },
      );
    }

    // =====================================================
    // TODAY IN IST
    // =====================================================

    const now = new Date();

    const istDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    // Start of today in IST
    const startDay = new Date(`${istDate}T00:00:00+05:30`);

    // Start of tomorrow in IST
    const nextDay = new Date(startDay);

    nextDay.setUTCDate(nextDay.getUTCDate() + 1);

    // =====================================================
    // CHECK EXISTING ATTENDANCE
    // =====================================================

    const existingAttendance = await Attendance.findOne({
      employee: userID,
      date: {
        $gte: startDay,
        $lt: nextDay,
      },
    });

    if (existingAttendance) {
      return NextResponse.json(
        {
          message: "You have already checked in today.",
          attendence: existingAttendance,
        },
        { status: 409 },
      );
    }

    // =====================================================
    // CREATE ATTENDANCE
    // =====================================================

    const attendance = await Attendance.create({
      employee: userID,

      date: now,

      checkIn: {
        time: now,

        location: {
          latitude,
          longitude,
        },
      },

      status: "present",

      workingTime: 0,
    });

    return NextResponse.json(
      {
        message: "Check-in successfully done.",

        // IMPORTANT:
        // Frontend will use this directly
        attendence: attendance,

        // Also return correctly-spelled version
        attendance,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CHECK-IN ERROR:", error);

    return NextResponse.json(
      {
        message: "Check-in failed.",

        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
