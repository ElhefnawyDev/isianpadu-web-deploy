import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');


export async function GET(request: NextRequest) {
  try {
    // Fetch all   and experiences GeneralInfo from the experiencesGenralInfo  table
    const experiencesGI = await prisma.experiencesGenralInfo.findMany();
    return NextResponse.json(experiencesGI, { status: 200 });
  } catch (error) {
    console.error('Error fetching experiencesGenralInfo:', error);
    return NextResponse.json({ error: 'Failed to fetch experiencesGenralInfo' }, { status: 500 });
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
    const description = body.get('description') as string;
  
    
    // Insert new newHexperiencesGI into the newHexperiencesGI  table
    const newHexperiencesGI = await prisma.experiencesGenralInfo.create({
      data: {
        title,
        description,

      },
    });

    return NextResponse.json(newHexperiencesGI, { status: 201 });
}