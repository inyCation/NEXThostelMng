import { connect } from "@/dbConfig/dbConfig";
import Contact from "@/models/contact";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    if (request.method !== "GET") {
        return NextResponse.json({ error: "Not Allowed" }, { status: 405 });
    }

    try {
        await connect();

        const contacts = await Contact.find({});

        return NextResponse.json({ success: true, contacts }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}
