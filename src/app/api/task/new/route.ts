import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";
import task from "@/models/task";

export async function POST(request: Request) {
  try {
    await connectDB();

    const formData = await request.formData();

    // Get form data
    const taskData = formData.get("task")?.toString();
    const department = formData.get("department")?.toString();
    const employee = formData.get("employee")?.toString();
    const deadline = formData.get("deadline")?.toString();

    // IMPORTANT: Don't convert File to string
    const file = formData.get("attachment");

    // Validate required fields
    if (!taskData || !department || !employee) {
      return NextResponse.json(
        { message: "Task, department and employee are required" },
        { status: 400 },
      );
    }

    // Attachment is optional
    let attachmentURL: string | null = null;

    // Upload file to Cloudinary if file exists
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "task",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });

      attachmentURL = result.secure_url;
    }

    // Save task in MongoDB
    const taskDatabase = await task.create({
      employee: employee,
      task: taskData,
      deadline,
      attachment: attachmentURL,
      department,
    });

    return NextResponse.json(
      {
        message: "Task created successfully",
        task: taskDatabase,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create task error:", error);

    return NextResponse.json(
      { message: "Something went wrong while creating task" },
      { status: 500 },
    );
  }
}
