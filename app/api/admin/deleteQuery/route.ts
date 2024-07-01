import { connect } from "@/dbConfig/dbConfig";
import HostelBooking from "@/models/hostelBookingModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    if (request.method === "POST") {
        try {
            const reqBody = await request.json();
            const { bId } = reqBody;

            // Find the hostel booking with matching bId and retrieve hostelId
            const hostelBooking = await HostelBooking.findOne({ _id: bId });

            if (!hostelBooking) {
                return NextResponse.json({ error: "Hostel booking not found" }, { status: 404 });
            }

            // Retrieve hostelId from hostelBooking
         
            const deleteResult = await HostelBooking.deleteOne({ _id: bId });

            if (deleteResult.deletedCount === 0) {
                return NextResponse.json({ error: "Hostel booking not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Hostel booking deleted successfully" }, { status: 200 });

        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}
