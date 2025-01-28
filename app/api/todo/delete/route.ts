import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is missing in the request params" }, { status: 400 });
    }

    const isDeleted = await prisma.todo.delete({
      where: {
        id: id
      }
    });

    if (!isDeleted) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Task deleted successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}