import { NextRequest, NextResponse } from 'next/server';
import {connect} from "@/dbConfig/dbConfig"
import Hostel from '@/models/hostelModel';

connect();

export async function GET(req :NextRequest, res : NextResponse) {
    try {
        const data = await Hostel.find({ featured: true }); 
        return NextResponse.json(data);
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
