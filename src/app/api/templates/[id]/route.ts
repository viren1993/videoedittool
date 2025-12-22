import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/templates/[id] - Get a single template by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching template:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/templates/[id] - Update an existing template
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validate required fields
    if (!body.template_name) {
      return NextResponse.json(
        { error: "template_name is required" },
        { status: 400 }
      );
    }

    if (!body.template_json) {
      return NextResponse.json(
        { error: "template_json is required" },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database update
    const template = {
      id,
      ...body,
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json(template, { status: 200 });
  } catch (error) {
    console.error("Error updating template:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/templates/[id] - Delete a template
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Here you would typically delete from a database
    // await db.templates.delete({ where: { id } });

    // TODO: Replace with actual database delete
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting template:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}


