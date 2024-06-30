import { connect } from "@/dbConfig/dbConfig";
import HostelBooking from "@/models/hostelBookingModel";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";

connect(); // Assuming this function sets up your database connection

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;
    
    // Find admin details based on email
    const adminDetail = await Admin.findOne({ email });

    if (!adminDetail) {
      return NextResponse.json({ error: "Hostel Owner Does Not Exist" }, { status: 404 });
    }

    // Find hostel bookings associated with the owner's email
    const hostelBookings = await HostelBooking.find({ ownerEmail: email });

    return NextResponse.json({ hostelBookings }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
