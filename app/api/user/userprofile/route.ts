import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

connect();

export async function POST(req:NextRequest,res:NextResponse){

    const reqBody = await req.json();
    const {email} = reqBody;
    const userDetail = await User.findOne({email})
    
    if (!userDetail) return NextResponse.json({ error: "User Does Not exists", success: false }, { status: 500 })

    NextResponse.json({userDetail})
}