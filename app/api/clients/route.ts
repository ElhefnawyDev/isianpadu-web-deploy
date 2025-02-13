import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Parse form data with proper type casting
    const name = formData.get("name") as string;
    const logoFile = formData.get("logo") as File | null;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const projectsData = formData.get("projects") as string;

    // Validate required fields
    if (!name || !category || !date) {
      return NextResponse.json(
        { error: "Missing required fields: name, category, date" },
        { status: 400 }
      );
    }

    // Handle file upload
    let logoUrl: string | null = null;
    if (logoFile && logoFile.size > 0) {
      // Validate file size (e.g., limit to 5MB)
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (logoFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Logo file size exceeds 5MB" },
          { status: 400 }
        );
      }

      // Ensure upload directory exists
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

      // Generate unique filename
      const fileExtension = path.extname(logoFile.name);
      const uniqueFileName = `${Date.now()}${fileExtension}`;
      const filePath = path.join(UPLOAD_DIR, uniqueFileName);

      // Write file to disk
      const buffer = Buffer.from(await logoFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      logoUrl = `/uploads/${uniqueFileName}`;
    }

    // Parse projects data with error handling
    let projects = [];
    try {
      projects = JSON.parse(projectsData || "[]");
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid projects data format" },
        { status: 400 }
      );
    }

    // Check if we're updating an existing client or creating a new one
    let result;
    const clientId = formData.get("clientId") as string | null;

    // Create new client or update existing client with projects
    if (clientId) {
      // Update existing client and add new projects
      result = await prisma.$transaction(async (tx) => {
        // Find the existing client
        const existingClient = await tx.clients.findUnique({
          where: { id: parseInt(clientId) },
        });

        if (!existingClient) {
          throw new Error("Client not found");
        }

        // Update the client record
        const updatedClient = await tx.clients.update({
          where: { id: parseInt(clientId) },
          data: {
            name,
            logo: logoUrl ?? existingClient.logo, // Retain existing logo if not updated
            category,
            date,
            projectNumber: (existingClient.projects.length + projects.length).toString(),
          }
        });

        // Add new projects if any
        if (projects.length > 0) {
          await tx.project.createMany({
            data: projects.map((project: any) => ({
              title: project.title,
              date: project.date,
              description: project.description,
              clientId: updatedClient.id,
            })),
          });
        }

        return tx.clients.findUnique({
          where: { id: updatedClient.id },
          include: { projects: true },
        });
      });
    } else {
      // Create new client and add projects
      result = await prisma.$transaction(async (tx) => {
        // Create main client record
        const newClient = await tx.clients.create({
          data: {
            name,
            logo: logoUrl,
            category,
            date,
            projectNumber: projects.length.toString(),
          }
        });

        // Create associated projects if any
        if (projects.length > 0) {
          await tx.project.createMany({
            data: projects.map((project: any) => ({
              title: project.title,
              date: project.date,
              description: project.description,
              clientId: newClient.id,
            }))
          });
        }

        // Return complete client data with projects
        return tx.clients.findUnique({
          where: { id: newClient.id },
          include: { projects: true },
        });
      });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create or update client. Please check your input and try again." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Validate category exists in our predefined list
    const validCategories = ["Government Ministry", "GLC", "Private", "FSIs"];
    if (category && !validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    const clients = await prisma.clients.findMany({
      where: category ? { 
        category: {
          equals: category,
          mode: 'insensitive'
        }
      } : {},
      include: { projects: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
