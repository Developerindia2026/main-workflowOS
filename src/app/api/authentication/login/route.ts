import { NextResponse } from "next/server";
import user from "@/models/users";
import connectDB from "@/lib/mongoose";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await connectDB();

  const { email, password } = await request.json();

  const jwtKey = process.env.JWT_KEY;

  try {
    const verifyEmail = await user.findOne({
      email: email,
      password: password,
    });

    if (!verifyEmail) {
      return NextResponse.json({ message: "Email not found" }, { status: 409 });
    }

    const token = jwt.sign(
      {
        id: verifyEmail._id,
        name: verifyEmail.username,
        email: verifyEmail.email,
      },
      jwtKey,
      {
        expiresIn: "7d",
      },
    );

    const response = NextResponse.json(
      {
        message: "LOGIN APPROVED",
        token: token,
      },
      {
        status: 200,
      },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "NO DATA ADDED" }, { status: 500 });
  }
}
