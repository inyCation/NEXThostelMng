import { NextRequest, NextResponse } from 'next/server';


import Hostel from '@/models/hostelModel';
import {connect} from "@/dbConfig/dbConfig"


connect()

export async function POST(req: NextRequest, res:NextResponse) {

    const reqBody = await req.json()
    const {pincode,locality,title} = reqBody;
    console.log(reqBody);
    

    if(pincode){
        const hostel = await Hostel.find({pincode: pincode});
        return NextResponse.json({hostel});
    }
    if(locality){
        const hostel = await Hostel.find({ location: { $regex: locality, $options: 'i' } });
        return NextResponse.json({hostel});
    }
    if(title){
        const hostel = await Hostel.find({ title: { $regex: title, $options: 'i' } });
        return NextResponse.json({hostel});
    }

    return NextResponse.json({error: "Please Give a Valid Search Filter"},{status:400})

}
