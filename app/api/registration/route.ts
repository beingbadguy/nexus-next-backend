import { dbConnection } from "@/lib/dbConnection";
import registrationModel from "@/models/registration.model";

import { NextRequest, NextResponse } from "next/server";

const BRANCHES = [
  "CSE (AIML)",
  "CSE (Cyber Security)",
  "Civil",
  "Electrical",
  "ECE",
  "Mechanical",
];

export async function POST(req: NextRequest) {
  await dbConnection();
  try {
    const data = await req.json();

    const {
      fullName,
      email,
      phoneNumber,
      semester,
      gender,
      branch,
      registrationNumber,
    } = data;

    // Basic validation
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !semester ||
      !gender ||
      !branch ||
      !registrationNumber
    ) {
      return NextResponse.json(
        { error: "All fields are required.", success: false },
        { status: 400 }
      );
    }

    if (!BRANCHES.includes(branch)) {
      return NextResponse.json(
        { error: "Invalid branch.", success: false },
        { status: 400 }
      );
    }

    if (semester < 1 || semester > 8) {
      return NextResponse.json(
        { error: "Semester must be between 1 and 8.", success: false },
        { status: 400 }
      );
    }

    // TODO: Save to database here
    const isAlreadyExist = await registrationModel.findOne({
      email,
    });
    if (isAlreadyExist) {
      return NextResponse.json(
        { error: "Email already exists.", success: false },
        { status: 400 }
      );
    }
    const registration = await registrationModel.create({
      fullName,
      email,
      phoneNumber,
      semester,
      gender,
      branch,
      registrationNumber,
    });
    await registration.save();

    return NextResponse.json(
      { message: "Registration successful.", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Something went wrong.",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnection();
  try {
    const registrations = await registrationModel.find({});
    return NextResponse.json({ registrations, success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to fetch registrations.",
        success: false,
      },
      { status: 500 }
    );
  }
}
