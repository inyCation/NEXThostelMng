import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { hostelId: number } }) {
    const hostelId = params.hostelId;

    if (typeof hostelId !== 'number') {
        return NextResponse.json({
            message: "OOPs, Wrong Request",
            success: false
        }, {
            status: 406
        });
    }

    const data = { message: hostelId };
    return NextResponse.json(data);
}
