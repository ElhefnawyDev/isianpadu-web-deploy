import { NextRequest, NextResponse } from "next/server";
import { createNewsEventsSchema } from "../../../admin/Components/CreateNew/EventAndNews/ValidationSchema";
import prisma from "@/prisma/client";
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function PATCH(request: NextRequest, {params}: {params:{id:string,}}){
    const body = await request.formData();
    const question = body.get('question') as string;
    const answers = body.get('answers') as string;

    // if(!validation.success) 
    //   return NextResponse.json(validation.error.format(), {status: 400});

    const faq = await prisma.faq.findUnique({
        where: {id: parseInt(params.id)}
    })
    if(!faq) return NextResponse.json({error:'Invalid Issue'}, {status: 404});

    
        const updatedFaq = await prisma.faq.update({
            where: {id: faq.id},
            data: {
                question,
                answers,
            }
        })
        return NextResponse.json(updatedFaq);
    }

    export async function DELETE(request: NextRequest, {params}: {params:{id:string,}}){ 
      const faq = await prisma.faq.findUnique({
          where: {id: parseInt(params.id)}
      })
      if(!faq) return NextResponse.json({error:'Invalid Issue'}, {status: 404});

      await prisma.faq.delete({
          where: {id: faq.id}
      })

      return NextResponse.json({});
}