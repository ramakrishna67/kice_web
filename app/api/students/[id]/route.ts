import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const client = await clientPromise;

    const db = client.db("kice");

    await db.collection("users").deleteOne({
      _id: new ObjectId(id),
      role: "student",
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
    });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const client = await clientPromise;
    const db = client.db("kice");
    const body = await req.json();
    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id), role: "student" }, { $set: body });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 },
    );
  }
}
