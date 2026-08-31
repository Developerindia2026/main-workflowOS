import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import task from "@/models/task";
import { connect } from "http2";

export async function GET(request: Request) {
  await connectDB();

  try {
    const taskData = await task.find().populate("employee");

    return NextResponse.json(
      { message: "data founded", data: taskData },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "invalid catch block handled" },
      { status: 500 },
    );
  }
}
