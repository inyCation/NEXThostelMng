"use server"
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest, res: NextResponse) {
    if (req.nextUrl.pathname.startsWith("/api/user/logout")) {
        const cookie: any = req.cookies.get("userAuthToken")?.value;

        if (!cookie) {
            return NextResponse.json({
                message: "Authentication token not found",
                success: false
            }, { status: 401 });
        } else {
            jwt.verify(cookie, process.env.TOKEN_SECRET!, (err: any, decoded: any) => {
                if (err) {
                    return NextResponse.json({ message: 'Error verifying token', error: err });
                } else {
                    // Token is valid, access decoded data
                    console.log('Decoded token:', decoded);
                    // Perform logout actions if needed
                    // For example, invalidate the token or clear session data
                    return NextResponse.next();
                }
            });
        }
    }
    // Continue the request chain if needed
    return NextResponse.next();
}
