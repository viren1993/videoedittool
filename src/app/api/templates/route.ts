import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

// Mock database for templates
let templates: any[] = [];

export async function GET() {
  return NextResponse.json({ templates }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newTemplate = {
      id: nanoid(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...body,
    };

    return NextResponse.json(newTemplate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for update" },
        { status: 400 }
      );
    }

    const updatedTemplate = {
      id,
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json(updatedTemplate, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update template" },
      { status: 500 }
    );
  }
}






