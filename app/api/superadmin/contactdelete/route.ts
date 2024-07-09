import { connect } from "@/dbConfig/dbConfig";
import Contact from "@/models/contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    if (request.method !== "POST") {
        return NextResponse.json({ error: "Not Allowed" }, { status: 405 });
    }

    try {
        await connect();

        const reqBody = await request.json();
        const { messageId } = reqBody;

        if (!messageId) {
            return NextResponse.json({ error: "Message ID is required", success: false }, { status: 400 });
        }

        const deleteResult = await Contact.deleteOne({ _id: messageId });

        if (deleteResult.deletedCount === 0) {
            return NextResponse.json({ error: "Message not found", success: false }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Message deleted successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}
