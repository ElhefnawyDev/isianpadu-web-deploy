import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Get all events/news
export async function GET(request: NextRequest) {
  try {
    const newsEvents = await prisma.newsEvents.findMany();
    return NextResponse.json(newsEvents, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// Post news/event with multiple images
export async function POST(request: NextRequest) {
  // Check if the upload directory exists, if not create it
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
  // Parse formData from the request
  const body = await request.formData();
  const title = body.get('title') as string;
  const description = body.get('description') as string;
  const date = body.get('date') as string;
  const short_description = body.get('short_description') as string;
  const imageFile = body.get('image') as File | null; // Main image
  const extraImages = body.getAll('images') as File[]; // Multiple extra images
  // Validate the required fields
  if (!title || !description || !imageFile || extraImages.length === 0) {
    return NextResponse.json({ error: 'Title, description, and images are required' }, { status: 400 });
  }
  // Function to save a file and return the saved file URL
  const saveFile = async (file: File): Promise<string> => {
    const fileExtension = path.extname(file.name);
    const uniqueFileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFileName);
    const writeStream = fs.createWriteStream(filePath);
    const reader = file.stream().getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      writeStream.write(Buffer.from(value));
    }
    writeStream.end();
    return `/uploads/${uniqueFileName}`;
  };
  // Save the main image
  const imageUrl = await saveFile(imageFile);
  // Save the extra images and get their URLs
  const extraImageUrls = await Promise.all(extraImages.map((image) => saveFile(image)));
  // Insert new news/event into the database with multiple images
  const newNewsEvent = await prisma.newsEvents.create({
    data: {
      title,
      description,
      short_description,
      date,
      image: imageUrl, // Main image
      extra_images: extraImageUrls, // Extra images as an array
    },
  });
  return NextResponse.json(newNewsEvent, { status: 201 });
}
