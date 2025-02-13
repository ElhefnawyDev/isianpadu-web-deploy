import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');


export async function GET(request: NextRequest) {
  try {
    // Fetch all   and homeGeneralInfo from the homeGeneralInfo  table
    const HomeGI = await prisma.homeGeneralInfo.findMany();
    return NextResponse.json(HomeGI, { status: 200 });
  } catch (error) {
    console.error('Error fetching homeGeneralInfo:', error);
    return NextResponse.json({ error: 'Failed to fetch homeGeneralInfo' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {

      // Check if the upload directory exists, if not create it
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

    // Parse formData from the request
    const body = await request.formData();
    const title1 = body.get('title1') as string;
    const title2 = body.get('title2') as string;
    const content = body.get('content') as string;
    const width = body.get('width') as string;
    const height = body.get('height') as string;
    const image1File = body.get('image1') as File | null;
    // const validation = createServices Schema.safeParse(body)

    // if(!validation.success) 
    //   return NextResponse.json(validation.error.format(), {status: 400});



        // Validate the required fields
        if (!image1File) {
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

      return `/uploads/${uniqueFileName}`;
    };

    // Save files and get their URLs
    const image1Url = await saveFile(image1File);

    // Insert new HomeGenralInfo into the HomeGenralInfo  table
    const homeGI = await prisma.homeGeneralInfo.create({
      data: {
        title1,
        title2,
        content,
        width,
        height,
        image1: image1Url,
      },
    });

    return NextResponse.json(homeGI, { status:201});
}