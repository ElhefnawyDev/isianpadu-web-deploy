import { NextRequest, NextResponse } from "next/server";
import { createNewsEventsSchema } from "../../../admin/Components/CreateNew/EventAndNews/ValidationSchema";
import prisma from "@/prisma/client";
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function PATCH(request: NextRequest, {params}: {params:{id:string,}}){
    // Parse formData from the request
    const body = await request.formData();
    const title = body.get('title') as string;
    const opacity = body.get('opacity') as string;
    const imageFile = body.get('image') as File | null;
    // const validation = createpartners Schema.safeParse(body)


    const headerHome = await prisma.headerPages.findUnique({
        where: {id: parseInt(params.id)}
    })
    if(!headerHome) return NextResponse.json({error:'Invalid Issue'}, {status: 404});

            // Validate the required fields
            if (!imageFile) {
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
    
        const updatedHeaderHome = await prisma.headerPages.update({
            where: {id: headerHome.id},
            data: {
                title,
                opacity,
                image: imageUrl,
            }
        })
        return NextResponse.json(updatedHeaderHome);
    }

    // GET request for fetching a specific header by id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const headerHome = await prisma.headerPages.findUnique({
      where: { id: parseInt(params.id) }
  });

  if (!headerHome) {
      return NextResponse.json({ error: 'Header not found' }, { status: 404 });
  }

  return NextResponse.json(headerHome);
}