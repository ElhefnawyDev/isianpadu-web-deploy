import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function PATCH(request: NextRequest, {params}: {params:{id:string,}}){
    const body = await request.formData();
    const username = body.get('username') as string;
    const email = body.get('password') as string;
    const password = body.get('email') as string;

    const User = await prisma.user.findUnique({
        where: {id: parseInt(params.id)}
    })
    if(!User) return NextResponse.json({error:'Invalid Issue'}, {status: 404});

        const updatedUser = await prisma.user.update({
            where: {id: User.id},
            data: {
                username,
                email,
                password
            }
        })
        return NextResponse.json(updatedUser);
    }

    export async function DELETE(request: NextRequest, {params}: {params:{id:string,}}){ 
            const User = await prisma.user.findUnique({
                where: {id: parseInt(params.id)}
            })
            if(!User) return NextResponse.json({error:'Invalid Issue'}, {status: 404});
    
            await prisma.user.delete({
                where: {id: User.id}
            })
    
            return NextResponse.json({});
    }