import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import task from "@/models/task";

interface ParamsProp {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: ParamsProp) {
  await connectDB();

  const { status } = await request.json();
  const { id } = await params;

  if (!status) {
    return NextResponse.json(
      { message: "body not founed in backend" },
      { status: 404 },
    );
  }

  try {
    const updateTask = await task.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      {
        new: true,
      },
    );

    return NextResponse.json(
      { message: "updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "invalid backend" }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: ParamsProp) {
  await connectDB();

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "unable to fetch the id" },
      { status: 408 },
    );
  }

  try {
    const GetTask = await task.findById(id);

    return NextResponse.json(
      { message: "task founded", data: GetTask },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "catched block handle in backedn" },
      { status: 500 },
    );
  }
}
