import { connect } from "@/dbConfig/dbConfig"
import SuperAdmin from "@/models/superadminModel";
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
connect();
export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === 'POST') {
        try {
            const reqBody = await req.json();
            const { username, email, password } = reqBody;
            const superadmin = await SuperAdmin.findOne({ email })
            if (superadmin) return NextResponse.json({ error: "Super Admin Alreay exists", success: false }, { status: 500 })
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt)
            const newSuperAdmin = new SuperAdmin({
                username,
                email,
                password: hashedPassword
            })
            const savedUser = await newSuperAdmin.save()
            return NextResponse.json({
                message: "User Registered Successfully",
                success: true
            })
        } catch (error: any) {
            return NextResponse.json({ error: error.message, success: false }, { status: 400 })
        }
    } else {
        return NextResponse.json({ error: "Not Authenticated, IP Logged", success: false }, { status: 500 })
    }
}