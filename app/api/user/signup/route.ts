import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"

import { NextRequest, NextResponse } from "next/server"


connect();


export async function POST(req: NextRequest, res: NextResponse) {


    if (req.method === 'POST') {
        try {
            const reqBody = await req.json();
            const { username, email, password } = reqBody;
    
            console.log(reqBody, "dfs");
            console.log(username);
    
    
    
            const user = await User.findOne({ email })
    
            console.log(user);
    
    
            if (user) return NextResponse.json({ Message: "User Alreay exists", success: false }, { status: 500 })
    
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt)
    
            const newUser = new User({
                username,
                email,
                password: hashedPassword
            })
    
            const savedUser = await newUser.save()
            console.log(savedUser);
    
            //send verification mail
    
    
            return NextResponse.json({
                message: "User Registered Successfully",
                success: true
            })
    
    
    
    
        } catch (error: any) {
            return NextResponse.json({ Message: error.message, success: false }, { status: 500 })
        }
    } else {
        return NextResponse.json({ Message: "Not Authenticated, IP Logged", success: false }, { status: 500 })
    }


}