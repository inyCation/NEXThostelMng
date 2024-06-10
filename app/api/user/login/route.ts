import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
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

            const user = await User.findOne({ email })
            if (!user) {
                return NextResponse.json({ error: "User does not exist", success: false }, { status: 400 })
            }

            //check if password is correct
            const validPassword = await bcryptjs.compare(password, user.password)
            if (!validPassword) {
                return NextResponse.json({ error: "Invalid password", success: false }, { status: 400 })
            }
        

            //create token data
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }
            //create token
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

            const response = NextResponse.json({
                message: "Login successful",
                success: true,
            })
            response.cookies.set("userAuthToken", token, {
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