import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import leave from "@/models/leaves";
import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { reason, leaveType } = await request.json();

  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ message: "user not found" }, { status: 408 });
    }

    const decode = Jwt.verify(token.value, process.env.JWT_KEY!) as {
      id: string;
    };

    const leaveData = await leave.create({
      reason: reason,
      user: decode.id,
      leaveType: leaveType,
      status: "pending",
    });

    return NextResponse.json(
      { message: "invalid", leave: leaveData },
      { status: 500 },
    );
  } catch (error) {
    console.error("LEAVE API ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
