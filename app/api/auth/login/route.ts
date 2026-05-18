import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("kice");
    const user = await db
      .collection("users")
      .findOne({ email: email.toLowerCase().trim(), password });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "No Account found with this email",
      });
    }
    if (user.password !== password) {
      return NextResponse.json({
        success: false,
        error: "Incorrect password",
      });
    }
    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
