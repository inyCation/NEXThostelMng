import { connect } from "@/dbConfig/dbConfig";
import Hostel from "@/models/hostelModel"
import HostelBooking from "@/models/hostelBookingModel"
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest) {

    if (request.method === "POST") {
        try {
            const reqBody = await request.json()
            const { userEmail, checkInDate, checkOutDate, totalPrice, GST, hostelId, noOfPerson } = reqBody;


            // Fetch the hostel details to get ownerEmail
            const hostel = await Hostel.findById(hostelId);
            if (!hostel) {
                throw new Error("Hostel not found");
            }
            const ownerEmail = hostel.owner;

            console.log(`
                Booking Details:
                User Email: ${userEmail}
                Check-in Date: ${checkInDate}
                Check-out Date: ${checkOutDate}
                Total Price: ${totalPrice}
                GST: ${GST}
                Hostel ID: ${hostelId}
                Number of Persons: ${noOfPerson}
                Owner Email: ${ownerEmail}
              `);

            // Optionally, you can save the booking details to your database
            const newBooking = new HostelBooking({
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
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
    }
    else {
        return NextResponse.json({ error: "Not Allowed" }, { status: 500 })
    }
}