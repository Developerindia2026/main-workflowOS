import user from "@/models/users";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    await connectDB();
    const addUser = await user.insertMany([
      {
        username: "Deepanshu Arya",
        email: "deepanshu@gmail.com",
        password: "empdeepanshu",
        employmentType: "employee",
      },
      {
        username: "Shakshi Saxena",
        email: "shakshi@gmail.com",
        password: "empshakshi",
        employmentType: "employee",
      },
      {
        username: "Karan Arya",
        email: "karan@gmail.com",
        password: "empkaran",
        employmentType: "employee",
      },
      {
        username: "Amit Gosh",
        email: "amit@gmail.com",
        password: "empamit",
        employmentType: "employee",
      },
    ]);

    return NextResponse.json({ message: "DATA ADDED" }, { status: 200 });
  } catch (error) {
    console.error("🔥 ADD USERS ERROR:", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
