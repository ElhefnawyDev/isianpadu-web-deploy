import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.formData();
  const title = body.get("title") as string;
  const hsDescription = body.get("hsDescription") as string;
  const description = body.get("description") as string;
  const lDescription = body.get("lDescription") as string;

  const imageFile = body.get("image") as File | null;
  const imageFile2 = body.get("image2") as File | null;
  const imageFile3 = body.get("image3") as File | null;

  const existingImage = body.get("existingImage") as string | null;
  const existingImage2 = body.get("existingImage2") as string | null;
  const existingImage3 = body.get("existingImage3") as string | null;

  const deletedImage = body.get("deletedImage") as string | null;
  const deletedImage2 = body.get("deletedImage2") as string | null;
  const deletedImage3 = body.get("deletedImage3") as string | null;

  const Services = await prisma.services.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!Services) return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  // Ensure the upload directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  // Handle image deletion
  const deleteFile = (imagePath: string | null) => {
    if (imagePath && imagePath.startsWith("/uploads/")) {
      const filePath = path.join(UPLOAD_DIR, imagePath.split("/uploads/")[1]);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  };

  // Delete images marked for deletion
  deleteFile(deletedImage);
  deleteFile(deletedImage2);
  deleteFile(deletedImage3);

  // Delete old images if new ones are uploaded
  if (imageFile && existingImage) deleteFile(existingImage);
  if (imageFile2 && existingImage2) deleteFile(existingImage2);
  if (imageFile3 && existingImage3) deleteFile(existingImage3);

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

  // Save new files or retain existing ones
  const imageUrl = imageFile ? await saveFile(imageFile) : existingImage;
  const imageUrl2 = imageFile2 ? await saveFile(imageFile2) : existingImage2;
  const imageUrl3 = imageFile3 ? await saveFile(imageFile3) : existingImage3;

  // Update the Services record in the database
  const updatedServices = await prisma.services.update({
    where: { id: Services.id },
    data: {
      title,
      hsDescription,
      description,
      lDescription,
      image: imageUrl,
      image2: imageUrl2,
      image3: imageUrl3,
    },
  });

  return NextResponse.json(updatedServices);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const Services = await prisma.services.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!Services) return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  // Delete associated images
  const deleteFile = (imagePath: string | null) => {
    if (imagePath && imagePath.startsWith("/uploads/")) {
      const filePath = path.join(UPLOAD_DIR, imagePath.split("/uploads/")[1]);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  };

  deleteFile(Services.image);
  deleteFile(Services.image2);
  deleteFile(Services.image3);

  // Delete the Services record
  await prisma.services.delete({
    where: { id: Services.id },
  });

  return NextResponse.json({});
}
