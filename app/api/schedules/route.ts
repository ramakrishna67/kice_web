import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;

  const db = client.db("kice");

  const schedules = await db.collection("schedules").find({}).toArray();

  return NextResponse.json(schedules);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;

    const db = client.db("kice");

    await db.collection("schedules").updateOne(
      {
        week: body.week,
        date: body.date,
        day: body.day,
      },
      {
        $set: body,
      },
      {
        upsert: true,
      },
    );

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
