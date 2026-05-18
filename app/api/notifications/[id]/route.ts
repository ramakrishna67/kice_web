import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const client = await clientPromise;
        const db = client.db("kice");

        await db.collection("notifications").deleteOne({ _id: id });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete notification:", error);
        return NextResponse.json(
            { error: "Failed to delete notification" },
            { status: 500 },
        );
    }
}