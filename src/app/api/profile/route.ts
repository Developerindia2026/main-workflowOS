import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import user from "@/models/users";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "token not find" }, { status: 408 });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY!) as {
      id: string;
    };

    const employeeID = decoded.id;

    const findUser = await user.findById(employeeID);

    return NextResponse.json(
      { message: "user find", user: findUser },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "invaid" }, { status: 500 });
  }
}
