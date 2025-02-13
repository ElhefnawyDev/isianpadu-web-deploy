import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'fonts');


export async function GET(request: NextRequest) {
  try {
    // Fetch all Events and News from the newsevents table
    const font = await prisma.font.findMany();
    return NextResponse.json(font, { status: 200 });
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
    const fontFile = body.get('font') as File | null;
    // const validation = createNewsEventsSchema.safeParse(body)

    // if(!validation.success) 
    //   return NextResponse.json(validation.error.format(), {status: 400});

        // Validate the required fields
        if (!fontFile) {
          return NextResponse.json(
            { error: 'Title, description, image, and icon are required' },
            { status: 400 }
          );
        }

      // Function to save a file
      const saveFile = async (file: File): Promise<string> => {
      const fileExtension = path.extname(file.name);
      const uniqueFileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(UPLOAD_DIR, uniqueFileName);
      const writeStream = fs.createWriteStream(filePath);
      const reader = file.stream().getReader();

      // Write file chunks to disk
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        writeStream.write(Buffer.from(value));
      }
      writeStream.end();

      return `/fonts/${uniqueFileName}`;
    };

    // Save files and get their URLs
    const fontUrl = await saveFile(fontFile);

    // Insert new news and events into the newsEvents table
    const newFont = await prisma.font.create({
      data: {
        title,
        font: fontUrl,
      },
    });

    return NextResponse.json(newFont, { status: 201 });
}