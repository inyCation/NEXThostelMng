import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    if (request.method !== "POST") {
        return NextResponse.json({ error: "Not Allowed" }, { status: 405 }); 
    }
    try {
        await connect();
        const reqBody = await request.json();
        const { email, typeofuser } = reqBody;
        if (typeofuser === "owner") {
            const admin = await Admin.findOne({ email });
            if (!admin) {
                return NextResponse.json({ error: "Owner not found" }, { status: 404 });
            }
            await Admin.deleteOne({ email });
            return NextResponse.json({ success: `Deleted Successfully: ${typeofuser}`, status: true }, { status: 200 });
        } else if (typeofuser === "user") {
            const user = await User.findOne({ email });
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            await User.deleteOne({ email });
            return NextResponse.json({ success: `Deleted Successfully: ${typeofuser}`, status: true }, { status: 200 });
        }
        return NextResponse.json({ error: "Invalid user type", status: false }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
