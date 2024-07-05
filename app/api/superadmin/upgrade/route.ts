import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    if (request.method !== "POST") {
        return NextResponse.json({ error: "Not Allowed" }, { status: 405 }); // 405 Method Not Allowed
    }

    try {
        await connect();

        const reqBody = await request.json();
        const { email, status } = reqBody;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return NextResponse.json({ error: "Owner does not exist", success: false }, { status: 400 });
        }

        if (admin.premium === status) {
            return NextResponse.json({ error: `Owner Is Already : ${status?"Premium":"Non-premium"} User`, success: false }, { status: 400 });
        }
       
        const updatedAdmin = await Admin.findOneAndUpdate(
            { email },
            { $set: { premium: status, updatedAt: new Date() } },
            { new: true }
        );
        if (!updatedAdmin) {
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }

        return NextResponse.json({ success: "Updated Successfully", status: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
