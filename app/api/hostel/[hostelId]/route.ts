import { NextRequest, NextResponse } from 'next/server';
import Hostel from '@/models/hostelModel';
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

connect();

export async function GET(req: NextRequest, { params }: { params: { hostelId: number } }) {
    const hostelId = params.hostelId;


    const cookie :any = req.cookies.get("adminAuthToken")?.valueOf();

    jwt.verify(cookie, process.env.TOKEN_SECRET! , (err:any, decoded :any) => {
        if (err) {
            return NextResponse.json({'Error verifying token' : err});
        } else {
            // Token is valid, access decoded data
            console.log('Decoded token:', decoded);
            // Access data from the decoded token
            console.log('User ID:', decoded.id);
            console.log('Username:', decoded.username);
            console.log('Email:', decoded.email);
            // You can access other data as needed
        }
    });


    // Fetch Hostel(s) based on Hostel ID
    try {
        const hostel = await Hostel.find({ pincode: hostelId });
        return NextResponse.json({ hostel });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
