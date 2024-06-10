import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connect } from "@/dbConfig/dbConfig";
import Hostel from "@/models/hostelModel"

connect();


export async function POST(req: NextRequest, res: NextResponse) {

    try {

        const reqBody = await req.json()
        const { title, price, description, capacity, location, amenities, pincode, imageURLs } = reqBody;

        console.log(reqBody);

        const hostel = await Hostel.findOne({ title });

        if (hostel) return NextResponse.json({ error: "Hostel Already Exists", success: false }, { status: 500 });

        const newHostel = new Hostel({
            title,
            price,
            description,
            capacity,
            amenities,
            location,
            pincode,
            imageURLs,

        })

        const saveHostel = await newHostel.save()
        console.log(saveHostel);


        return NextResponse.json({
            message: "Hostel Added Successfully",
            success: true
        }, { status: 200 })



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
