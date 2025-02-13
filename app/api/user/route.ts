import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

import { hash } from "bcrypt";  // Import bcryptjs for password hashing
import { Prisma } from "@prisma/client";


// Validation regex for password strength (at least 3 digits)
const passwordStrengthRegex = /^(?=(.*\d){3,}).*$/;
//   const passwordStrengthRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password, confirmPassword } = body;

    // Validation checks
    if (!email || !username || !password ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

// Password strength validation
if (!passwordStrengthRegex.test(password)) {
    return NextResponse.json(
      {
        message: "Password must contain at least 3 digits and be at least 8 characters long, including an uppercase letter, a lowercase letter, a number, and a special character.",
      },
      { status: 400 }
    );
  }
  
    // // Confirm password match
    // if (password !== confirmPassword) {
    //   return NextResponse.json(
    //     { message: "Passwords do not match." },
    //     { status: 400 }
    //   );
    // } 

    // Check if user already exists by email
    const existingUserByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingUserByEmail) {
      return NextResponse.json({ message: "Email already exists" }, { status: 409 });
    }

    // Check if user already exists by username
    const existingUserByUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUserByUsername) {
      return NextResponse.json({ message: "Username already exists" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // // Remove password before returning the response
    // delete newUser.password;

    // Return the user without the password field
    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
  try {
    // Fetch all   and Services from the Services  table
    const User = await prisma.user.findMany();
    return NextResponse.json(User, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}