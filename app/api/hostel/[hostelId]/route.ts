import { NextRequest, NextResponse } from 'next/server';
import Hostel from '@/models/hostelModel';
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

// Establish database connection
connect();

// Handler function for GET request
export async function GET(req: NextRequest, { params }: { params: { hostelId: number } }) {
    const hostelId = params.hostelId;

    try {
        // Fetch Hostel(s) based on Hostel ID
        const hostel = await Hostel.find({ _id: hostelId });

        // Return JSON response with fetched hostel data
        return NextResponse.json({ hostel });
    } catch (error: any) {
        // Return JSON response with error message and status code 500 (Internal Server Error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
