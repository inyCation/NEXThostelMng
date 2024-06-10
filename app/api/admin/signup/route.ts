import { connect } from "@/dbConfig/dbConfig"
import Admin from "@/models/adminModel"
import bcryptjs from "bcryptjs"

import { NextRequest, NextResponse } from "next/server"


connect();


export async function POST(req: NextRequest, res: NextResponse) {


    if (req.method === 'POST') {
        try {
            const reqBody = await req.json();
            const { username, email, password } = reqBody;
    
            const admin = await Admin.findOne({ email })


            if (admin) return NextResponse.json({ error: "Hostel Owner Alreay exists", success: false }, { status: 500 })
    
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt)
    
            const newAdmin = new Admin({
                username,
                email,
                password: hashedPassword
            })
    
            const savedAdmin = await newAdmin.save()
            return NextResponse.json({
                message: "Hostel Owner Registered Successfully",
                success: true
            })
    
        } catch (error: any) {
            return NextResponse.json({ error: error.message, success: false }, { status: 400 })
        }
    } else {
        return NextResponse.json({ error: "Not Authenticated,", success: false }, { status: 500 })
    }


}