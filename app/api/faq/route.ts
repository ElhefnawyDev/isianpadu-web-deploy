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
    const faq = await prisma.faq.findMany();
    return NextResponse.json(faq, { status: 200 });
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
    const question = body.get('question') as string;
    const answers = body.get('answers') as string;
    // const validation = createServices Schema.safeParse(body)


    // Insert new Services    into the Services  table
    const newFaq = await prisma.faq.create({
      data: {
        question,
        answers,
      },
    });

    return NextResponse.json(newFaq, { status: 201 });
}