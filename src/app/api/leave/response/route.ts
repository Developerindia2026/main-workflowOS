import { NextResponse } from "next/server";
import leave from "@/models/leaves";
import connectDB from "@/lib/mongoose";

export async function PUT(request: Request) {
  await connectDB();

  const { USERID, status } = await request.json();
  if (!USERID || !status) {
    return NextResponse.json(
      { message: "userid and status is not recieved in backend" },
      { status: 400 },
    );
  }

  try {
    const responseLeave = await leave.findByIdAndUpdate(
      USERID,
      {
        status: status,
      },
      { new: true },
    );

    return NextResponse.json(
      { message: "response marked as per the status successfullyy" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "handle by catch block in backend" },
      { status: 500 },
    );
  }
}
