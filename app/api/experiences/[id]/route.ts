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
  const imageFile = body.get("logo") as File | null;
  const existingLogo = body.get("existingLogo") as string | null;
  const deletedLogo = body.get("deletedLogo") as string | null;

  // Validate Experience ID
  const experienceId = parseInt(params.id);
  if (isNaN(experienceId)) {
    return NextResponse.json({ error: "Invalid Experience ID" }, { status: 400 });
  }

  // Find the experience record
  const experiences = await prisma.experiences.findUnique({
    where: { id: experienceId },
  });
  if (!experiences) {
    return NextResponse.json({ error: "Experience not found" }, { status: 404 });
  }

  // Validate required fields
  if (!existingLogo && !imageFile) {
    return NextResponse.json(
      { error: "Logo is required (either existing or new upload)" },
      { status: 400 }
    );
  }

  // Ensure the upload directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  // Delete the logo if marked for deletion
  if (deletedLogo && deletedLogo.startsWith("/uploads/")) {
    const filePath = path.join(UPLOAD_DIR, deletedLogo.split("/uploads/")[1]);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  // Delete the existing logo if a new file is being uploaded
  if (imageFile && experiences.logo) {
    const existingFilePath = path.join(UPLOAD_DIR, experiences.logo.split("/uploads/")[1]);
    if (fs.existsSync(existingFilePath)) fs.unlinkSync(existingFilePath);
  }

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

  // Save new logo if provided; otherwise, retain the existing one
  const logoUrl = imageFile ? await saveFile(imageFile) : existingLogo;

  // Update the record in the database
  const updatedExperiences = await prisma.experiences.update({
    where: { id: experienceId },
    data: {
      title,
      date,
      description,
      logo: logoUrl || "",
    },
  });

  return NextResponse.json(updatedExperiences);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const experienceId = parseInt(params.id);
  if (isNaN(experienceId)) {
    return NextResponse.json({ error: "Invalid Experience ID" }, { status: 400 });
  }

  const experiences = await prisma.experiences.findUnique({
    where: { id: experienceId },
  });
  if (!experiences) {
    return NextResponse.json({ error: "Experience not found" }, { status: 404 });
  }

  // Delete the logo file from the server
  if (experiences.logo) {
    const filePath = path.join(UPLOAD_DIR, experiences.logo.split("/uploads/")[1]);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  // Delete the record
  await prisma.experiences.delete({
    where: { id: experienceId },
  });

  return NextResponse.json({});
}
