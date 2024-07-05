import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Contact from '@/models/contact';


connect();

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    try {
      
      const reqBody = await req.json();
      const { name, email, message } = reqBody;

      
      const newContact = new Contact({
        name,
        email,
        message,
      });

      
      await newContact.save();

      return NextResponse.json({
        message: 'Message Sent Successfully',
        success: true,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message, success: false }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: 'Invalid Method', success: false }, { status: 405 });
  }
}
