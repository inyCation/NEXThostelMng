import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
    if(req.method ==="GET"){
        try {
            const response = NextResponse.json(
                {
                    message: "Logout successful",
                    success: true,
                }
            )
            response.cookies.set("SuperAdminAuthToken", "",
            {
                httpOnly: true, expires: new Date(0)
            });
            return response;
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
    else{
        return NextResponse.json({ error: "Not Authenticated, IP Logged" }, { status: 500 });
    }

}
