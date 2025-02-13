import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.formData();
  const title1 = body.get("title1") as string;
  const title2 = body.get("title2") as string;
  const content = body.get("content") as string;
  const height = body.get("height") as string;
  const width = body.get("width") as string;

  const image1File = body.get("image1") as File | null;

  const existingImage1 = body.get("existingImage1") as string | null;

  const deletedImage1 = body.get("deletedImage1") as string | null;

  const HomeGI = await prisma.homeGeneralInfo.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!HomeGI) return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  // Ensure upload directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  // Helper function to delete a file
  const deleteFile = (imagePath: string | null) => {
    if (imagePath && imagePath.startsWith("/uploads/")) {
      const filePath = path.join(UPLOAD_DIR, imagePath.split("/uploads/")[1]);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  };

  // Delete images marked for deletion
  deleteFile(deletedImage1);

  // Delete old images if new ones are uploaded
  if (image1File && existingImage1) deleteFile(existingImage1);

  // Function to save a file
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

  // Save new images or retain existing ones
  const image1Url = image1File ? await saveFile(image1File) : existingImage1;

  // Update record in the database
  const updatedHomeGI = await prisma.homeGeneralInfo.update({
    where: { id: HomeGI.id },
    data: {
      title1,
      title2,
      content,
      height,
      width,
      image1: image1Url ||"",
    },
  });

  return NextResponse.json(updatedHomeGI);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const HomeGI = await prisma.homeGeneralInfo.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!HomeGI) return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  // Helper function to delete a file
  const deleteFile = (imagePath: string | null) => {
    if (imagePath && imagePath.startsWith("/uploads/")) {
      const filePath = path.join(UPLOAD_DIR, imagePath.split("/uploads/")[1]);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  };

  // Delete associated images
  deleteFile(HomeGI.image1);

  // Delete the database record
  await prisma.homeGeneralInfo.delete({
    where: { id: HomeGI.id },
  });

  return NextResponse.json({});
}
