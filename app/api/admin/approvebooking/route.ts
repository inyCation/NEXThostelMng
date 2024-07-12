import { connect } from "@/dbConfig/dbConfig";
import HostelBooking from "@/models/hostelBookingModel";
import { NextRequest, NextResponse } from "next/server";


connect()
export async function POST(request: NextRequest) {
    if (request.method === "POST") {
        try {
            const reqBody = await request.json()
            const { status, bId } = reqBody;
            if (typeof status !== 'boolean') {
                return NextResponse.json({ error: "Invalid status format" }, { status: 400 });
            }
            const hostelBooking = await HostelBooking.findOne({ _id: bId });
            if (!hostelBooking) {
                return NextResponse.json({ error: "Hostel booking not found" }, { status: 404 });
            }
            const hostelId = await hostelBooking.hostelId;
            const updatedBooking = await HostelBooking.findOneAndUpdate(
                { _id: bId, hostelId: hostelId },
                { $set: { status: status } },
                { new: true } 
            );
            if (!updatedBooking) {
                return NextResponse.json({ error: "Hostel booking not found" }, { status: 404 });
            }
            return NextResponse.json({ success: `Updated Successfully`, status: true }, { status: 200 });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
    }
    else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}