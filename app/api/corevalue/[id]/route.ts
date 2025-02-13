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
    const present = body.get('present') as string;

    // if(!validation.success) 
    //   return NextResponse.json(validation.error.format(), {status: 400});

    const coreValue = await prisma.coreValue.findUnique({
        where: {id: parseInt(params.id)}
    })
    if(!coreValue) return NextResponse.json({error:'Invalid Issue'}, {status: 404});

    
        const updatedCoreValue = await prisma.coreValue.update({
            where: {id: coreValue.id},
            data: {
                title,
                present,
            }
        })
        return NextResponse.json(updatedCoreValue);
    }

    export async function DELETE(request: NextRequest, {params}: {params:{id:string,}}){ 
      const coreValue = await prisma.coreValue.findUnique({
          where: {id: parseInt(params.id)}
      })
      if(!coreValue) return NextResponse.json({error:'Invalid Issue'}, {status: 404});

      await prisma.progressBar.delete({
          where: {id: coreValue.id}
      })

      return NextResponse.json({});
}