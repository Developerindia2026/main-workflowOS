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

export async function POST(request: Request, { params }: userIdProp) {
  await connectDB();

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "id not recieved" }, { status: 404 });
  }

  const { username, phone, email } = await request.json();

  if (!username || !phone || !email) {
    return NextResponse.json({ message: "body not recieved" }, { status: 404 });
  }

  try {
    const editUserData = await user.findByIdAndUpdate(
      id,
      {
        username: username,
        phone: phone,
        email: email,
      },
      {
        new: true,
      },
    );

    return NextResponse.json(
      {
        message: "every thing working edit successfully done",
        data: editUserData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "invlaid" }, { status: 500 });
  }
}
