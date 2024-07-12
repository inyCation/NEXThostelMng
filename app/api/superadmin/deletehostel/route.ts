import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import Hostel from "@/models/hostelModel";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    if (request.method !== "POST") {
        return NextResponse.json({ error: "Not Allowed" }, { status: 405 });
    }
    try {
        await connect();
        const reqBody = await request.json();
        const { email, hostelId } = reqBody;
        const owner = await Admin.findOne({ email });
        if (!owner) {
            return NextResponse.json({ error: "Owner not found", status: false }, { status: 404 });
        }
        const deleteResult = await Hostel.deleteOne({ _id: hostelId, owner: email  });
        if (deleteResult.deletedCount === 0) {
            return NextResponse.json({ error: "Hostel not found or already deleted", status: false }, { status: 404 });
        }
        return NextResponse.json({ success: "Hostel deleted successfully", status: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
