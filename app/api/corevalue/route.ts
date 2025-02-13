import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');


export async function GET(request: NextRequest) {
  try {
    // Fetch all   and Services from the Services  table
    const coreValue = await prisma.coreValue.findMany();
    return NextResponse.json(coreValue, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {

      // Check if the upload directory exists, if not create it
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

    // Parse formData from the request
    const body = await request.formData();
    const title = body.get('title') as string;
    const present = body.get('present') as string;
    // const validation = createServices Schema.safeParse(body)


    // Insert new Services    into the Services  table
    const newCoreValue = await prisma.coreValue.create({
      data: {
        title,
        present,
      },
    });

    return NextResponse.json(newCoreValue, { status: 201 });
}