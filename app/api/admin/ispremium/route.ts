import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    if (request.method !== "POST") {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        // Fetch the admin record with the given email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return NextResponse.json({ message: "No admin found with this email", success: false }, { status: 404 });
        }

        // Check if the admin has premium status
        const isPremium = admin.premium;

        return NextResponse.json({ isPremium, success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}
