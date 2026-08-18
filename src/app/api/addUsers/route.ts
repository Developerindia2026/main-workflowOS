import user from "@/models/users";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    await connectDB();
    const addUser = await user.insertMany([
      {
        username: "Deepanshu Arya",
        email: "deepanshu@gmail.com",
        password: "empdeepanshu",
        phone: "9876543210",
        department: "Senior Developer",
        role: "employee",
        designation: "Frontend Developer",
        joiningDate: new Date("2025-09-04"),
        profileImage: "/assets/profiles/deepanshu.jpg",
      },
      {
        username: "Shakshi Saxena",
        email: "shakshi@gmail.com",
        password: "empshakshi",
        phone: "8800482151",
        department: "Human Resources",
        role: "employee",
        designation: "HR Executive",
        joiningDate: new Date("2025-10-15"),
        profileImage: "/assets/profiles/shakshi.jpg",
      },
      {
        username: "Karan Arya",
        email: "karan@gmail.com",
        password: "empkaran",
        phone: "9876543212",
        department: "Development",
        role: "employee",
        designation: "Backend Developer",
        joiningDate: new Date("2025-11-10"),
        profileImage: "/assets/profiles/karan.jpg",
      },
      {
        username: "Amit Gosh",
        email: "amit@gmail.com",
        password: "empamit",
        phone: "9876543213",
        department: "Marketing",
        role: "employee",
        designation: "Marketing Executive",
        joiningDate: new Date("2026-01-05"),
        profileImage: "/assets/profiles/amit.jpg",
      },
      {
        username: "Rohit Sharma",
        email: "rohit@gmail.com",
        password: "emprohit",
        phone: "9876543214",
        department: "Sales",
        role: "employee",
        designation: "Sales Executive",
        joiningDate: new Date("2026-02-12"),
        profileImage: "/assets/profiles/rohit.jpg",
      },
      {
        username: "Ankit Verma",
        email: "ankit@gmail.com",
        password: "managerankit",
        phone: "9876543220",
        department: "Development",
        role: "manager",
        designation: "Development Manager",
        joiningDate: new Date("2024-06-15"),
        profileImage: "/assets/profiles/ankit.jpg",
      },
      {
        username: "Neha Kapoor",
        email: "neha@gmail.com",
        password: "managerneha",
        phone: "9876543221",
        department: "Human Resources",
        role: "manager",
        designation: "HR Manager",
        joiningDate: new Date("2024-08-20"),
        profileImage: "/assets/profiles/neha.jpg",
      },
    ]);

    return NextResponse.json({ message: "DATA ADDED" }, { status: 200 });
  } catch (error) {
    console.error("🔥 ADD USERS ERROR:", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
