import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { whatToDo, whenToDo, note, status, userId } = reqBody;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    // const { whatToDo, whenToDo, note, status, userId } = body;

    const newTodo = await prisma.todo.create({
      data: {
        whatToDo,
        whenToDo: new Date(whenToDo),
        note,
        status: status || "pending",
        user: { connect: { id: userId } }
      }
    });
    return NextResponse.json({ success: true, message: "Task added successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal Server error" }, { status: 500 });
  }
}