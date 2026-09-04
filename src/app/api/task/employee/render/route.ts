import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import task from "@/models/task";
import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function GET(request: Request) {
  await connectDB();

  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    const decoded = Jwt.verify(token, process.env.JWT_KEY!) as unknown as {
      id: string;
    };

    if (!decoded) {
      return NextResponse.json(
        { message: "invalid and unauthroized user" },
        { status: 404 },
      );
    }

    const userID = decoded.id;
    console.log(userID);

    const getTask = await task.find({
      employee: userID,
      status: "pending",
    });
    console.log(getTask);

    return NextResponse.json(
      { message: "task founded", data: getTask },
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
