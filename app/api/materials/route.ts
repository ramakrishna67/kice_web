import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("kice");
    const materials = await db.collection("materials").find().toArray();
    return NextResponse.json(materials);
  } catch (error) {
    console.error("Failed to fetch materials:", error);
    return NextResponse.json(
      { error: "Failed to fetch materials" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("kice");
    await db.collection("materials").insertOne(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to add material:", error);
    return NextResponse.json(
      { error: "Failed to add material" },
      { status: 500 },
    );
  }
}
