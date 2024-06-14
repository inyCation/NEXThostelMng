import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

connect();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();
        const { email, password, newpassword } = reqBody;

        const userDetail = await User.findOne({ email });

        if (!userDetail) {
            return NextResponse.json({ error: "User Does Not Exist", success: false }, { status: 404 });
        }

        const isPasswordMatch = await bcryptjs.compare(password, userDetail.password);
        
        if (!isPasswordMatch) {
            return NextResponse.json({ error: "Incorrect Password", success: false }, { status: 401 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedNewPassword = await bcryptjs.hash(newpassword, salt);

        userDetail.password = hashedNewPassword;
        await userDetail.save();

        return NextResponse.json({ success: true, message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
