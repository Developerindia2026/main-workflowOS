import { NextResponse } from "next/server";
import annoucement from "@/models/annoucement";
import connectDB from "@/lib/mongoose";

export async function POST(request: Request) {
  await connectDB();

  const { title, category, priority, details } = await request.json();

  if (!title || !category || !priority || !details) {
    return NextResponse.json(
      { message: "feilds are not there" },
      { status: 408 },
    );
  }

  try {
    const annoucementData = await annoucement.create({
      title: title,
      Category: category,
      priority: priority,
      details: details,
    });

    return NextResponse.json(
      { message: "created", data: annoucementData },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "not satisfy by code" },
      { status: 500 },
    );
  }
}
