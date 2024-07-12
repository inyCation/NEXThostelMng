import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
connect();
export async function GET(req :NextRequest, res : NextResponse) {
    try {
        const users = await User.find();
        return NextResponse.json({users, success: true},{status:200})
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
