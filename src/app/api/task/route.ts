import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import task from "@/models/task";

export async function GET(request: Request) {
  await connectDB();

  try {
    const getTask;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "catch block error" }, { status: 500 });
  }
}
