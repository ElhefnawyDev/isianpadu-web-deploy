import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.formData();
  const name = body.get("name") as string;
  const imageFile = body.get("logo") as File | null; // New logo upload
  const existingLogo = body.get("existingLogo") as string | null; // Existing logo
  const deletedLogo = body.get("deletedLogo") as string | null; // Logo marked for deletion

  // Validate Partner ID
  const partnerId = parseInt(params.id);
  if (isNaN(partnerId)) {
    return NextResponse.json({ error: "Invalid Partner ID" }, { status: 400 });
  }

  // Fetch the partner record
  const partners = await prisma.partners.findUnique({
    where: { id: partnerId },
  });
  if (!partners) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 });
  }

  // Ensure the upload directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  // Delete logo if explicitly marked for deletion
  if (deletedLogo && deletedLogo.startsWith("/uploads/")) {
    const filePath = path.join(UPLOAD_DIR, deletedLogo.split("/uploads/")[1]);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  // Delete the existing logo if a new one is being uploaded
  if (imageFile && partners.logo) {
    const existingFilePath = path.join(UPLOAD_DIR, partners.logo.split("/uploads/")[1]);
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

  // Save new logo if provided; otherwise, retain the existing one
  const logoUrl = imageFile ? await saveFile(imageFile) : existingLogo;

  // Update the partner record in the database
  const updatedPartners = await prisma.partners.update({
    where: { id: partnerId },
    data: {
      name,
      logo: logoUrl || "",
    },
  });

  return NextResponse.json(updatedPartners);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const partnerId = parseInt(params.id);
  if (isNaN(partnerId)) {
    return NextResponse.json({ error: "Invalid Partner ID" }, { status: 400 });
  }

  // Fetch the partner record
  const partners = await prisma.partners.findUnique({
    where: { id: partnerId },
  });
  if (!partners) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 });
  }

  // Delete the associated logo from the server
  if (partners.logo) {
    const filePath = path.join(UPLOAD_DIR, partners.logo.split("/uploads/")[1]);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  // Delete the partner record
  await prisma.partners.delete({
    where: { id: partnerId },
  });

  return NextResponse.json({});
}
