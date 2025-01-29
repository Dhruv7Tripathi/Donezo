// Use a single Prisma instance (if using in dev mode)
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { userId, title, description, priority, status, duedate } = reqBody;

    // Validate required fields
    if (!userId || !title || !description || !priority || !status || !duedate) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate priority (convert string to enum)
    // const priorityEnum = Priority[priority.toUpperCase() as keyof typeof Priority];
    // if (!priorityEnum) {
    //   return NextResponse.json(
    //     { success: false, message: "Invalid priority value" },
    //     { status: 400 }
    //   );
    // }

    // Validate user existence
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Validate and convert duedate
    const dueDateObj = new Date(duedate);
    if (isNaN(dueDateObj.getTime())) {
      return NextResponse.json(
        { success: false, message: "Invalid due date format" },
        { status: 400 }
      );
    }
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        priority,  // Use enum
        status,
        duedate: dueDateObj,
        user: { connect: { id: userId } }
      }
    });

    return NextResponse.json(
      { success: true, message: "Task added successfully", data: newTodo },
      { status: 201 }
    );

  } catch (error) {
    // console.error("Error creating task:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error: " + (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}
