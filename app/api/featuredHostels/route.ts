import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    return NextResponse.json({
        test:"THIS NEXT.js"
    })
}