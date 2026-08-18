import { NextResponse } from "next/server";
import user from "@/models/users";
import connectDB from "@/lib/mongoose";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    console.log("🔥 LOGIN API STARTED");

    await connectDB();

    console.log("✅ DATABASE CONNECTED");

    const { email, password } = await request.json();

    console.log("✅ REQUEST DATA RECEIVED");

    const jwtKey = process.env.JWT_KEY;

    if (!jwtKey) {
      throw new Error("JWT_KEY is not defined");
    }

    console.log("✅ JWT_KEY FOUND");

    const verifyEmail = await user.findOne({
      email: email,
      password: password,
    });

    console.log("✅ USER QUERY COMPLETED:", !!verifyEmail);

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

    console.log("✅ JWT CREATED");

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
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("❌ LOGIN API ERROR:", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
