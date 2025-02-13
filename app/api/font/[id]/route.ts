import { NextRequest, NextResponse } from "next/server";
import { createNewsEventsSchema } from "../../../admin/Components/CreateNew/EventAndNews/ValidationSchema";
import prisma from "@/prisma/client";
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'fonts');

export async function PATCH(request: NextRequest, {params}: {params:{id:string,}}){
    const body = await request.formData();
    const title = body.get('title') as string;
    const fontFile = body.get('font') as File | null;

    // if(!validation.success) 
    //   return NextResponse.json(validation.error.format(), {status: 400});

    const font = await prisma.font.findUnique({
        where: {id: parseInt(params.id)}
    })
    if(!font) return NextResponse.json({error:'Invalid Issue'}, {status: 404});

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
    
        const updatedFont = await prisma.font.update({
            where: {id: font.id},
            data: {
                title,
                font: fontUrl,
            }
        })
        return NextResponse.json(updatedFont);
    }
    
    export async function DELETE(request: NextRequest, {params}: {params:{id:string,}}){ 
            const font = await prisma.font.findUnique({
                where: {id: parseInt(params.id)}
            })
            if(!font) return NextResponse.json({error:'Invalid Issue'}, {status: 404});
    
            await prisma.font.delete({
                where: {id: font.id}
            })
    
            return NextResponse.json({});
    }