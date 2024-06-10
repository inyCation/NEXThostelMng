import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import Hostel from "@/models/hostelModel"

connect();


export async function GET(req :NextRequest, res : NextResponse) {

    try {
        const hostel = await Hostel.find();

        return NextResponse.json({hostel, success: true},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
