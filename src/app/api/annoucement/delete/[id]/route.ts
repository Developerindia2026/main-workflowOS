import { NextResponse } from "next/server";
import annoucement from "@/models/annoucement";
import connectDB from "@/lib/mongoose";

interface Paramsprop {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, { params }: Paramsprop) {
  await connectDB();

  const { id } = await params;

  if (!params) {
    return NextResponse.json({ message: "id not recieved" }, { status: 400 });
  }

  try {
    const deleteAnnoucement = await annoucement.findByIdAndDelete(id);

    return NextResponse.json({ message: "deletted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "catch block" }, { status: 500 });
  }
}
