import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();

    try {
        const messages = await Message.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: messages });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request) {
    await dbConnect();

    try {
        const body = await request.json();
        
        const message = await Message.create(body);
        return NextResponse.json({ success: true, data: message }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
