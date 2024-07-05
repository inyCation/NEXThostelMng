import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel"

connect();


export async function GET(req :NextRequest, res : NextResponse) {

    try {
        const admin = await Admin.find();

        return NextResponse.json({admin, success: true},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
