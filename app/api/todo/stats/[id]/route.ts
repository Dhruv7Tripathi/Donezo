// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "@/lib/authoptions";
// import prisma from "@/lib/db";
// import { getServerSession } from "next-auth";

// export async function GET(req: NextRequest) {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const ToDo = await prisma.todo.count({ where: { status: "ToDo" } });
//     const InProgress = await prisma.todo.count({ where: { status: "InProgress" } });
//     const Done = await prisma.todo.count({ where: { status: "Done" } });

//     return NextResponse.json({ ToDo, InProgress, Done }, { status: 200 });
//   } catch (error) {
//     console.error("Database error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authoptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [ToDo, InProgress, Done] = await Promise.all([
      prisma.todo.count({ where: { status: "ToDo" } }),
      prisma.todo.count({ where: { status: "InProgress" } }),
      prisma.todo.count({ where: { status: "Done" } }),
    ]);

    return NextResponse.json(
      { success: true, data: { ToDo, InProgress, Done } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

