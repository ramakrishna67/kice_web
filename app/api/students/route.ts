import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("kice");
    const students = await db
      .collection("users")
      .find({ role: "student" })
      .toArray();
    return NextResponse.json(students);
  } catch (error) {
    console.error("Failed to fetch students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("kice");

    const newStudent = {
      ...body,
      joinDate: new Date().toISOString().split("T")[0], // Store only the date part
      role: "student",
    };

    await db.collection("users").insertOne(newStudent);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to add student:", error);
    return NextResponse.json(
      { error: "Failed to add student" },
      { status: 500 },
    );
  }
}
