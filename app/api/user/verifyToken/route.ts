import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


   
export async function middleware(req:NextRequest){
    const data = req.cookies.get("userAuthToken")?.value;

    const decoded = data && (
       await jwt.verify(data,process.env.TOKEN_SECRET!)

    ) 
    console.log(decoded);
    
    return NextResponse.next();
}