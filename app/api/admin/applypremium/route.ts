import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    if (request.method !== "POST") {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return NextResponse.json({ error: "Admin not found", status: false }, { status: 404 });
        }
        if(admin.premiumApplied == true){
            return NextResponse.json({ error: "Already Applied!! ", status: false }, { status: 403 });
        }
        
        admin.premiumApplied = true;
        await admin.save();

        return NextResponse.json({ success: "Applied For Premium Successfully", status: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
