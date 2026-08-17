import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const response = NextResponse.json(
      { message: "token removed" },
      { status: 200 },
    );

    response.cookies.delete("token");

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "invalid" }, { status: 500 });
  }
}
