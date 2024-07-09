import { connect } from "@/dbConfig/dbConfig";
import Hostel from "@/models/hostelModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    if (request.method !== "POST") {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        
        const hostels = await Hostel.find({ owner: email });

        if (hostels.length === 0) {
            return NextResponse.json({ message: "No hostels found for this owner", status: true }, { status: 200 });
        }

        return NextResponse.json({ hostels, status: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: false }, { status: 500 });
    }
}
