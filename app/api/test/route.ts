import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      {
        message: "This is demo test data to see whether api is working or not!",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
