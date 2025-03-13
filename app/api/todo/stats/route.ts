import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ToDo = await prisma.todo.count({
      where: {
        status: 'ToDo'
      }
    })
    const Inprogress = await prisma.todo.count({
      where: {
        status: 'InProgress'
      }
    })
    const Done = await prisma.todo.count({
      where: {
        status: 'Done'
      }
    })

    res.status(200).json({ ToDo, Inprogress, Done })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })

  }
}

