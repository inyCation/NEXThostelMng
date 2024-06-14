import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

connect();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();
        const { email } = reqBody;
    
        console.log(email);
        const userDetail = await User.findOne({ email });
        if (!userDetail) {
            return NextResponse.json({ error: "User Does Not exist" }, { status: 404 });
        }
        return NextResponse.json(userDetail, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
