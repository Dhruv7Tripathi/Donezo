// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { userId: string } }
// ) {
//   try {
//     const userId = params.userId;

//     if (!userId) {
//       return NextResponse.json(
//         { success: false, message: "User ID is required" },
//         { status: 400 }
//       );
//     }

//     const todos = await prisma.todo.findMany({
//       where: {
//         userId: userId
//       },
//       orderBy: {
//         duedate: 'asc'
//       }
//     });

//     return NextResponse.json(todos, { status: 200 });

//   } catch (error) {
//     console.error("Error fetching todos:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal Server Error: " + (error instanceof Error ? error.message : "Unknown error"),
//       },
//       { status: 500 }
//     );
//   }
// }


import { authOptions } from "@/lib/authoptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc"
      },
    });

    if (posts.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}