import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("kice");
        const notifications = await db
            .collection("notifications")
            .find()
            .toArray();
        return NextResponse.json(notifications);
    } catch (error) {
        console.error("Failed to fetch notifications:", error);
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
            { status: 500 },
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const client = await clientPromise;
        const db = client.db("kice");

        const newNotification = {
            ...body,
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        await db.collection("notifications").insertOne(newNotification);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to add notification:", error);
        return NextResponse.json(
            { error: "Failed to add notification" },
            { status: 500 },
        );
    }
}