import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authoptions"
import prisma from "@/lib/db"
interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { id: todoId } = await params
    const body = await request.json()

    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    })

    if (!todo) {
      return NextResponse.json({ success: false, message: "Todo not found" }, { status: 404 })
    }

    if (todo.userId !== session.user.id) {
      return NextResponse.json({ success: false, message: "Unauthorized to update this todo" }, { status: 403 })
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.priority !== undefined && { priority: body.priority }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.duedate !== undefined && { duedate: body.duedate }),
      },
    })

    return NextResponse.json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    })
  } catch (error) {
    console.error("Error updating todo:", error)
    return NextResponse.json({ success: false, message: "Failed to update todo" }, { status: 500 })
  }
}
