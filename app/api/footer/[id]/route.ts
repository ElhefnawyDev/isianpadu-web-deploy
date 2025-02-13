import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const footer = await prisma.footer.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!footer) return NextResponse.json({ error: 'Footer not found' }, { status: 404 });

    return NextResponse.json(footer);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    // Parse formData from the request
    const body = await request.formData();
    const address = body.get('address') as string;
    const description = body.get('description') as string;
    const copyright = body.get('copyright') as string;
    const location = body.get('location') as string;
    const email = body.get('email') as string;
    const phone = body.get('phone') as string;
    const workingHourse = body.get('workingHourse') as string;

    const footer = await prisma.footer.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!footer) return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

    const updatedFooter = await prisma.footer.update({
        where: { id: footer.id },
        data: {
            address,
            description,
            copyright,
            location,
            email,
            phone,
            workingHourse,
        }
    });
    
    return NextResponse.json(updatedFooter);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) { 
    const footer = await prisma.footer.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!footer) return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

    await prisma.footer.delete({
        where: { id: footer.id }
    });

    return NextResponse.json({});
}
