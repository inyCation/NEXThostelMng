import { NextRequest, NextResponse } from 'next/server';
import Hostel from '@/models/hostelModel';
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
connect();
export async function GET(req: NextRequest, { params }: { params: { hostelId: number } }) {
    const hostelId = params.hostelId;
    try {
        const hostel = await Hostel.find({ _id: hostelId });
        return NextResponse.json({ hostel });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
