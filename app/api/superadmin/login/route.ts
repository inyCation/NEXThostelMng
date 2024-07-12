import { connect } from "@/dbConfig/dbConfig";
import SuperAdmin from "@/models/superadminModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect()
export async function POST(request: NextRequest) {
    if (request.method === "POST") {
        try {
            const reqBody = await request.json()
            const { email, password } = reqBody;
            const superadmin = await SuperAdmin.findOne({ email })
            if (!superadmin) {
                return NextResponse.json({ error: "Super Admin does not exist, Report To Administrator", success: false }, { status: 400 })
            }
            const validPassword = await bcryptjs.compare(password, superadmin.password)
            if (!validPassword) {
                return NextResponse.json({ error: "Invalid password", success: false }, { status: 400 })
            }
            const tokenData = {
                id: superadmin._id,
                username: superadmin.username,
                email: superadmin.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
            const response = NextResponse.json({
                message: "Login successful",
                success: true,
            })
            response.cookies.set("SuperAdminAuthToken", token, {
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