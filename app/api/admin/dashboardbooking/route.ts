import { connect } from "@/dbConfig/dbConfig";
import HostelBooking from "@/models/hostelBookingModel";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";

connect(); 

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;
    const adminDetail = await Admin.findOne({ email });
    if (!adminDetail) {
      return NextResponse.json({ error: "Hostel Owner Does Not Exist" }, { status: 404 });
    }
    const hostelBookings = await HostelBooking.find({ ownerEmail: email });
    return NextResponse.json({ hostelBookings }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
