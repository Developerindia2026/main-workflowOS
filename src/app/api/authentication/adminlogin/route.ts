import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongoose";
import user from "@/models/users";

export async function POST(request: Request) {
  await connectDB();

  try {
    const { email, password } = await request.json();

    const verifyUser = await user.findOne({
      role: "manager",
      email: email,
      password: password,
    });

    if (!verifyUser) {
      return NextResponse.json(
        { message: "Role or Email not verified" },
        { status: 400 },
      );
    }

    const token = jwt.sign(
      {
        id: verifyUser._id,
        email: verifyUser.email,
        name: verifyUser.username,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: "7d",
      },
    );

    const response = NextResponse.json(
      { message: "token generated" },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `INVALID BACKEND NOT WOKRING` },
      { status: 500 },
    );
  }
}
