import { NextRequest, NextResponse } from "next/server";
import { createNewsEventsSchema } from "../../../admin/Components/CreateNew/EventAndNews/ValidationSchema";
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

    const visionMission = await prisma.visionMission.findUnique({
        where: {id: parseInt(params.id)}
    })
    if(!visionMission) return NextResponse.json({error:'Invalid Issue'}, {status: 404});
    
        const updatedVisionMission = await prisma.visionMission.update({
            where: {id: visionMission.id},
            data: {
                title,
                description,
            }
        })
        return NextResponse.json(updatedVisionMission);
    }