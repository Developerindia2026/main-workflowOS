import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import leave from "@/models/leaves";
import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 },
      );
    }

    const decode = Jwt.verify(token.value, process.env.JWT_KEY!) as {
      id: string;
    };

    const getLeaves = await leave.find({
      user: decode.id,
    });

    return NextResponse.json(
      {
        message: "Leaves fetched successfully",
        leaves: getLeaves,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET LEAVE ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
