import { NextRequest, NextResponse } from "next/server";

   
export async function GET(req:NextRequest){
    const data = req.cookies.get("userAuthToken")?.value;
    
    return NextResponse.json({
        test:data
    })
}
