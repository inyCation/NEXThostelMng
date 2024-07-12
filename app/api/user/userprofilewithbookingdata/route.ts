import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import HostelBooking from "@/models/hostelBookingModel";
import { NextRequest, NextResponse } from "next/server";

connect(); 

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;
    
    
    const userDetail = await User.findOne({ email });

    if (!userDetail) {
      return NextResponse.json({ error: "User Does Not Exist" }, { status: 404 });
    }

    
    const hostelBookings = await HostelBooking.find({ userEmail: email });

    return NextResponse.json({ userDetail, hostelBookings }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
