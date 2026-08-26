import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import attendence from "@/models/attendence";

export async function POST(request: Request) {
  const { latitude, longitude } = await request.json();

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return NextResponse.json(
      { message: "invalid latitude and longitude" },
      { status: 500 },
    );
  }

  try {
    // get user

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "invalid user" }, { status: 400 });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY!) as {
      id: string;
    };

    const userID = decode.id;

    if (!userID) {
      return NextResponse.json({ message: "invalid user ID" }, { status: 400 });
    }

    // EXISTING CHECKIN

    const today = new Date();

    const startDay = new Date(today);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(today);
    endDay.setHours(23, 59, 59, 999);

    const precheckin = await attendence.findOne({
      employee: userID,
      createdAt: {
        $gte: startDay,
        $lte: endDay,
      },
    });

    if (!precheckin) {
      return NextResponse.json(
        { message: "user did not checkin to get checkout", attendence: null },
        { status: 400 },
      );
    }

    // IF ALREADY CHECKOUT
    if (precheckin.checkOut?.time) {
      return NextResponse.json(
        { message: "user already checkout once", attendence: precheckin },
        { status: 400 },
      );
    }

    // make the checkout

    const checkoutTime = new Date();

    const workingTime =
      checkoutTime.getTime() - precheckin.checkIn!.time.getTime();

    // add in database

    precheckin.checkOut = {
      time: checkoutTime,
      location: {
        longitude: longitude,
        latitude: latitude,
      },
    };

    precheckin.workingTime = workingTime;

    await precheckin.save();

    return NextResponse.json(
      { message: "checkout successfully", attendence: precheckin },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "backend error" }, { status: 500 });
  }
}
