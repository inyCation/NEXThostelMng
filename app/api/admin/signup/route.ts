import { NextRequest, NextResponse } from 'next/server';

export async function GET(req :NextRequest, res : NextResponse) {
    const data = { message: 'Author data fetched successfully'};
    return NextResponse.json(data);
}
