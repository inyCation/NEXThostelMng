import { NextResponse } from "next/server";

export async function GET(req:NextResponse){
    return NextResponse.json({
        test:"THIS NEXT.js"
    })
}