import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {

    if (request.method === "POST") {
        try {
            const reqBody = await request.json()
            const { email, password } = reqBody;
            //check if user exists

            const admin = await Admin.findOne({ email })
            if (!admin) {
                return NextResponse.json({ error: "Admin does not exist", success: false }, { status: 400 })
            }

            //check if password is correct
            const validPassword = await bcryptjs.compare(password, admin.password)
            if (!validPassword) {
                return NextResponse.json({ error: "Invalid password", success: false }, { status: 400 })
            }

            //create token data
            const tokenData = {
                id: admin._id,
                username: admin.username,
                email: admin.email
            }
            //create token
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

            const response = NextResponse.json({
                message: "Admin Login successful",
                success: true,
            })
            response.cookies.set("adminAuthToken", token, {
                httpOnly: true,
                sameSite: "lax",
            })
            return response;

        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
    }
    else{
        return NextResponse.json({ error: "Not Allowed" }, { status: 500 })
    }
}