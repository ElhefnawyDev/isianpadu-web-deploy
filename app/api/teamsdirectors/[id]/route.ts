import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.formData();
  const name = body.get("name") as string;
  const position = body.get("position") as string;
  const bio = body.get("bio") as string;
  const imageFile = body.get("image") as File | null; // New image upload
  const existingImage = body.get("existingImage") as string | null; // Current image
  const deletedImage = body.get("deletedImage") as string | null; // Image marked for deletion

  // Validate TeamOrDirectors ID
  const teamOrDirectorId = parseInt(params.id);
  if (isNaN(teamOrDirectorId)) {
    return NextResponse.json({ error: "Invalid TeamOrDirectors ID" }, { status: 400 });
  }

  // Fetch the existing record
  const teamsDirectors = await prisma.teamOrDirectors.findUnique({
    where: { id: teamOrDirectorId },
  });
  if (!teamsDirectors) {
    return NextResponse.json({ error: "TeamOrDirectors not found" }, { status: 404 });
  }

  // Ensure the upload directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  // Handle image deletion if marked
  if (deletedImage && deletedImage.startsWith("/uploads/")) {
    const filePath = path.join(UPLOAD_DIR, deletedImage.split("/uploads/")[1]);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  // Delete the existing image if a new one is uploaded
  if (imageFile && teamsDirectors.image) {
    const existingFilePath = path.join(UPLOAD_DIR, teamsDirectors.image.split("/uploads/")[1]);
    if (fs.existsSync(existingFilePath)) fs.unlinkSync(existingFilePath);
  }

  // Function to save a new file
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

  // Save new image or retain the existing image
  const imageUrl = imageFile ? await saveFile(imageFile) : existingImage;

  // Update the TeamOrDirectors record in the database
  const updatedTeamsDirectors = await prisma.teamOrDirectors.update({
    where: { id: teamOrDirectorId },
    data: {
      name,
      position,
      bio,
      image: imageUrl, // Use the new or existing image URL
    },
  });

  return NextResponse.json(updatedTeamsDirectors);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const teamOrDirectorId = parseInt(params.id);
  if (isNaN(teamOrDirectorId)) {
    return NextResponse.json({ error: "Invalid TeamOrDirectors ID" }, { status: 400 });
  }

  // Fetch the TeamOrDirectors record
  const teamsDirectors = await prisma.teamOrDirectors.findUnique({
    where: { id: teamOrDirectorId },
  });
  if (!teamsDirectors) {
    return NextResponse.json({ error: "TeamOrDirectors not found" }, { status: 404 });
  }

  // Delete the associated image from the server
  if (teamsDirectors.image) {
    const filePath = path.join(UPLOAD_DIR, teamsDirectors.image.split("/uploads/")[1]);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  // Delete the TeamOrDirectors record
  await prisma.teamOrDirectors.delete({
    where: { id: teamOrDirectorId },
  });

  return NextResponse.json({});
}
