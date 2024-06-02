import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import Hostel from "@/models/hostelModel"






export async function POST(req :NextRequest, res : NextResponse) {

    try {

        const reqBody = await req.json()
        const { title, price,description,capacity,amenities,imageURLs} = reqBody;

        // console.log(reqBody);
        


        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }



    const data = { message: 'Author data fetched successfully'};
    return NextResponse.json(data);
}
