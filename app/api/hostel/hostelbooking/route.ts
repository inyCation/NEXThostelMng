import { connect } from "@/dbConfig/dbConfig";
import Hostel from "@/models/hostelModel";
import HostelBooking from "@/models/hostelBookingModel";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(request: NextRequest) {
    if (request.method === "POST") {
        try {
            const reqBody = await request.json();
            const { userEmail, checkInDate, checkOutDate, totalPrice, GST, hostelId, noOfPerson } = reqBody;
            const hostel = await Hostel.findById(hostelId);
            if (!hostel) {
                throw new Error("Hostel not found");
            }
            const ownerEmail = hostel.owner;
            const hostelName = hostel.title;          
            const newBooking = new HostelBooking({
                hostelName: hostelName,
                userEmail: userEmail,
                checkinDate: checkInDate,
                checkoutDate: checkOutDate,
                totalprice: totalPrice,
                gst: GST,
                hostelId: hostelId,
                noOfPerson: noOfPerson,
                ownerEmail: ownerEmail,
            });
        await newBooking.save();
            const response = NextResponse.json({
                message: "Booking successful",
                success: true,
            });
            return response;
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Not Allowed" }, { status: 500 });
    }
}
