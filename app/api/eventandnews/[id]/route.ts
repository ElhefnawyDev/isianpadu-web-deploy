import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.formData();
  const title = body.get("title") as string;
  const description = body.get("description") as string;
  const date = body.get("date") as string;
  const short_description = body.get("short_description") as string;
  const imageFile = body.get("image") as File | null;
  const extraImages = body.getAll("images") as File[];
  const existingContentImages = JSON.parse(body.get("existingContentImages") as string || "[]");
  const deletedImages = JSON.parse(body.get("deletedImages") as string || "[]");

  // Fetch the existing record
  const newsEvents = await prisma.newsEvents.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!newsEvents) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  // Utility function to save a file and return the URL
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

  // Save the main image only if a new file is provided
  const imageUrl = imageFile ? await saveFile(imageFile) : newsEvents.image;

  // Delete removed images from the server
  deletedImages.forEach((url: string) => {
    const filePath = path.join(UPLOAD_DIR, url.split("/uploads/")[1]);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  });

  // Save new extra images and merge with existing ones
  const newExtraImages = extraImages.length > 0 ? await Promise.all(extraImages.map((image) => saveFile(image))) : [];
  const extraImageUrls = [...existingContentImages, ...newExtraImages];

  // Optional: Remove unused old main image (if applicable)
  const cleanupUnusedFiles = () => {
    if (imageFile && newsEvents.image) {
      const oldFilePath = path.join(UPLOAD_DIR, newsEvents.image.split("/uploads/")[1]);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }
  };

  cleanupUnusedFiles();

  // Update the record in the database
  const updatedNewsEvents = await prisma.newsEvents.update({
    where: { id: newsEvents.id },
    data: {
      title,
      description,
      short_description,
      date,
      image: imageUrl,
      extra_images: extraImageUrls,
    },
  });

  return NextResponse.json(updatedNewsEvents);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const newsEvents = await prisma.newsEvents.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!newsEvents) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  // Optional: Delete associated files
  const deleteAssociatedFiles = () => {
    if (newsEvents.image) {
      const imagePath = path.join(UPLOAD_DIR, newsEvents.image.split("/uploads/")[1]);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    if (newsEvents.extra_images?.length) {
      newsEvents.extra_images.forEach((image) => {
        const imagePath = path.join(UPLOAD_DIR, image.split("/uploads/")[1]);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      });
    }
  };

  deleteAssociatedFiles();

  await prisma.newsEvents.delete({
    where: { id: newsEvents.id },
  });

  return NextResponse.json({});
}
