import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

connect();

export async function POST(req: NextRequest, res: NextResponse) {

    const reqBody = await req.json();
    const { email, password, newpassword } = reqBody;

    const userDetail = await User.findOne({ email })

    if (!userDetail) return NextResponse.json({ error: "User Does Not exists", success: false }, { status: 500 })

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)

    const userDetailUpdate = new User({
        email,
        password: hashedPassword
    })


}