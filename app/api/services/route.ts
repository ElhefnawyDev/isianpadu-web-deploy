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
    const Services = await prisma.services.findMany();
    return NextResponse.json(Services, { status: 200 });
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
    const hsDescription = body.get('hsDescription') as string;
    const description = body.get('description') as string;
    const lDescription = body.get('lDescription') as string;
    const imageFile = body.get('image') as File | null;
    const imageFile2 = body.get('image2') as File | null;
    const imageFile3 = body.get('image3') as File | null;
    // const validation = createServices Schema.safeParse(body)

    // if(!validation.success) 
    //   return NextResponse.json(validation.error.format(), {status: 400});

        // Validate the required fields
        if (!imageFile || !imageFile2 || !imageFile3) {
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
    const imageUrl = await saveFile(imageFile);
    const imageUrl2 = await saveFile(imageFile2);
    const imageUrl3 = await saveFile(imageFile3);

    // Insert new Services    into the Services  table
    const services = await prisma.services.create({
      data: {
        title,
        hsDescription,
        description,
        lDescription,
        image: imageUrl,
        image2: imageUrl2,
        image3: imageUrl3,
      },
    });

    return NextResponse.json(services, { status: 201 });
}