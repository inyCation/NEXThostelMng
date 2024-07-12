import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import Hostel from "@/models/hostelModel";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(request: NextRequest) {
    if (request.method !== "POST") {
        return NextResponse.json({ error: "Not Allowed" }, { status: 405 });
    }
    try {
        await connect();
        const reqBody = await request.json();
        const { email, hostelId } = reqBody;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return NextResponse.json({ error: "Owner not found" }, { status: 404 });
        }
        if (!admin.premium) {
            return NextResponse.json({ error: "Owner is not premium" }, { status: 403 });
        }
        const hostel = await Hostel.findOne({ _id: hostelId, owner: email });
        if (!hostel) {
            return NextResponse.json({ error: "Hostel not found" }, { status: 404 });
        }
        if (hostel.featured) {
            return NextResponse.json({ error: "Hostel is already upgraded" }, { status: 400 });
        }
        hostel.featured = true;
        await hostel.save();
        return NextResponse.json({ success: "Updated Successfully", status: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
