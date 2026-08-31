import { NextResponse } from "next/server";
import leave from "@/models/leaves";
import connectDB from "@/lib/mongoose";

export async function GET() {
  try {
    await connectDB();

    const getLeave = await leave.find({ status: "pending" }).populate("user");

    return NextResponse.json({
      message: "approved",
      data: getLeave,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
