// app/api/clients/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Helper function for file operations
const handleFileOperations = async (file: File | null, existingPath?: string) => {
  if (!file) return null;

  // Delete existing file if provided
  if (existingPath) {
    const oldFilePath = path.join(UPLOAD_DIR, existingPath.split("/uploads/")[1]);
    if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
  }

  // Save new file
  const fileExtension = path.extname(file.name);
  const uniqueFileName = `${uuidv4()}${fileExtension}`;
  const filePath = path.join(UPLOAD_DIR, uniqueFileName);
  
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${uniqueFileName}`;
};

// CREATE new client
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Parse form data
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const projectNumber = formData.get("projectNumber") as string;
    const logoFile = formData.get("logo") as File | null;
    const projectsData = formData.get("projects") as string | null;

    // Validate required fields
    if (!name || !category || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Handle file upload
    const logoUrl = logoFile ? await handleFileOperations(logoFile) : null;

    // Parse projects
    const projects = projectsData ? JSON.parse(projectsData) : [];

    // Create client with transaction
    const result = await prisma.$transaction(async (prisma) => {
      const newClient = await prisma.clients.create({
        data: {
          name,
          category,
          date,
          projectNumber,
          logo: logoUrl,
        }
      });

      if (projects.length > 0) {
        await prisma.project.createMany({
          data: projects.map((p: any) => ({
            title: p.title,
            date: p.date,
            description: p.description,
            clientId: newClient.id
          }))
        });
      }

      return prisma.clients.findUnique({
        where: { id: newClient.id },
        include: { projects: true }
      });
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}

// UPDATE client
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const clientId = parseInt(params.id);

    // Parse form data
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const projectNumber = formData.get("projectNumber") as string;
    const logoFile = formData.get("logo") as File | null;
    const existingImage = formData.get("existingImage") as string | null;
    const deletedImage = formData.get("deletedImage") as string | null;
    const projectsData = formData.get("projects") as string | null;

    // Get existing client
    const existingClient = await prisma.clients.findUnique({
      where: { id: clientId },
      include: { projects: true }
    });

    if (!existingClient) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Handle image operations
    let logoUrl = existingClient.logo;
    if (deletedImage) {
      logoUrl = null;
      const filePath = path.join(UPLOAD_DIR, deletedImage.split("/uploads/")[1]);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    if (logoFile) {
      logoUrl = await handleFileOperations(logoFile, existingClient.logo || undefined);
    }

    // Parse projects
    const projects = projectsData ? JSON.parse(projectsData) : [];

    // Update client with transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Update client
      const updatedClient = await prisma.clients.update({
        where: { id: clientId },
        data: {
          name,
          category,
          date,
          projectNumber,
          logo: logoUrl
        }
      });

      // Get existing project IDs
      const existingIds = existingClient.projects.map(p => p.id);
      
      // Delete removed projects
      const idsToDelete = existingIds.filter(id => 
        !projects.some((p: any) => p.id === id)
      );
      if (idsToDelete.length > 0) {
        await prisma.project.deleteMany({
          where: { id: { in: idsToDelete } }
        });
      }

      // Update/Create projects
      for (const project of projects) {
        if (project.id) {
          await prisma.project.update({
            where: { id: project.id },
            data: {
              title: project.title,
              date: project.date,
              description: project.description
            }
          });
        } else {
          await prisma.project.create({
            data: {
              title: project.title,
              date: project.date,
              description: project.description,
              clientId: updatedClient.id
            }
          });
        }
      }

      return prisma.clients.findUnique({
        where: { id: clientId },
        include: { projects: true }
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
}

// DELETE client
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = parseInt(params.id);

    const client = await prisma.clients.findUnique({
      where: { id: clientId },
      include: { projects: true }
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Delete image file
    if (client.logo) {
      const filePath = path.join(UPLOAD_DIR, client.logo.split("/uploads/")[1]);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    // Delete client (projects will be cascade deleted)
    await prisma.clients.delete({
      where: { id: clientId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }
}

// GET single client
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientId = parseInt(params.id);
    const client = await prisma.clients.findUnique({
      where: { id: clientId },
      include: { projects: true }
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch client" },
      { status: 500 }
    );
  }
}