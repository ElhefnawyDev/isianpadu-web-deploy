import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function PATCH(request: NextRequest, {params}: {params:{id:string,}}){
    const body = await request.formData();
    const title = body.get('title') as string;
    const description = body.get('description') as string;


    // if(!validation.success) 
    //   return NextResponse.json(validation.error.format(), {status: 400});

    const experiencesGI = await prisma.experiencesGenralInfo.findUnique({
        where: {id: parseInt(params.id)}
    })
    if(!experiencesGI) return NextResponse.json({error:'Invalid Issue'}, {status: 404});

    
        const updatedexperiencesGI = await prisma.experiencesGenralInfo.update({
            where: {id: experiencesGI.id},
            data: {
              title,
              description,
            }
        })
        return NextResponse.json(updatedexperiencesGI);
    }

    export async function DELETE(request: NextRequest, {params}: {params:{id:string,}}){ 
            const experiencesGI = await prisma.experiencesGenralInfo.findUnique({
                where: {id: parseInt(params.id)}
            })
            if(!experiencesGI) return NextResponse.json({error:'Invalid Issue'}, {status: 404});
    
            await prisma.experiencesGenralInfo.delete({
                where: {id: experiencesGI.id}
            })
    
            return NextResponse.json({});
    }