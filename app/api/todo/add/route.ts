import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { userId, title, description, priority, status, duedate } = reqBody;
    if (!userId || !title || !description || !priority || !status || !duedate) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        priority,
        status,
        duedate: new Date(duedate),
        user: { connect: { id: userId } }
      }
    });

    return NextResponse.json({ success: true, message: "Task added successfully", data: newTodo }, { status: 201 });

  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}