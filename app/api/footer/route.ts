import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');


export async function GET(request: NextRequest) {
  try {
    // Fetch all   and contact from the contact  table
    const Footer = await prisma.footer.findMany();
    return NextResponse.json(Footer, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json({ error: 'Failed to fetch contact' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {

      // Check if the upload directory exists, if not create it
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

    // Parse formData from the request
    const body = await request.formData();
    const address = body.get('address') as string;
    const description = body.get('description') as string;
    const copyright = body.get('copyright') as string;
    const location = body.get('location') as string;
    const email = body.get('email') as string;
    const phone = body.get('phone') as string;
    const workingHourse = body.get('workingHourse') as string;
  
    
    // Insert new Contact into the Contact  table
    const newFooter = await prisma.footer.create({
      data: {
        address,
        description,
        copyright,
        location,
        email,
        phone,
        workingHourse,
      },
    });

    return NextResponse.json(newFooter, { status: 201 });
}