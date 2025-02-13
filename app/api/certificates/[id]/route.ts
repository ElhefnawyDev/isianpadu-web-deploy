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
  const imageFile = body.get("image") as File | null; // New image upload
  const existingImage = body.get("existingImage") as string | null; // Existing image
  const deletedImage = body.get("deletedImage") as string | null; // Image marked for deletion

  // Validate Certificate ID
  const certificateId = parseInt(params.id);
  if (isNaN(certificateId)) {
    return NextResponse.json({ error: "Invalid Certificate ID" }, { status: 400 });
  }

  // Fetch existing certificate
  const certificates = await prisma.certificates.findUnique({
    where: { id: certificateId },
  });
  if (!certificates) {
    return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
  }

  // Ensure the upload directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  // Delete image if explicitly marked for deletion
  if (deletedImage && deletedImage.startsWith("/uploads/")) {
    const filePath = path.join(UPLOAD_DIR, deletedImage.split("/uploads/")[1]);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  // Delete existing image if a new one is being uploaded
  if (imageFile && certificates.image) {
    const existingFilePath = path.join(UPLOAD_DIR, certificates.image.split("/uploads/")[1]);
    if (fs.existsSync(existingFilePath)) fs.unlinkSync(existingFilePath);
  }

  // Function to save a new image
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

  // Save new image if provided, otherwise retain the existing one
  const imageUrl = imageFile ? await saveFile(imageFile) : existingImage;

  // Update the certificate record in the database
  const updatedCertificates = await prisma.certificates.update({
    where: { id: certificateId },
    data: {
      title,
      description,
      image: imageUrl || "",
    },
  });

  return NextResponse.json(updatedCertificates);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const certificateId = parseInt(params.id);
  if (isNaN(certificateId)) {
    return NextResponse.json({ error: "Invalid Certificate ID" }, { status: 400 });
  }

  // Fetch existing certificate
  const certificates = await prisma.certificates.findUnique({
    where: { id: certificateId },
  });
  if (!certificates) {
    return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
  }

  // Delete the associated image from the server
  if (certificates.image) {
    const filePath = path.join(UPLOAD_DIR, certificates.image.split("/uploads/")[1]);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  // Delete the certificate record
  await prisma.certificates.delete({
    where: { id: certificateId },
  });

  return NextResponse.json({});
}
