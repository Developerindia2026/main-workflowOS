import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import user from "@/models/users";

interface userIdProp {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: userIdProp) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "id not found" }, { status: 408 });
    }

    const userData = await user.findById(id);

    return NextResponse.json(
      { message: "user found", user: userData },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "invalid edit" }, { status: 500 });
  }
}
