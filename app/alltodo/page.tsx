"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { AppHeader } from "@/components/app-header"
import { TodoList } from "@/components/todo-list"
import type { Todo } from "@/createTodo"

export default function AllTodosPage() {
  const { data: session, status } = useSession()
  const [todos, setTodos] = React.useState<Todo[]>([])

  React.useEffect(() => {
    setTodos([
      {
        id: "1",
        title: "Complete project proposal",
        description: "Write and submit the project proposal for the new client",
        priority: "high",
        status: "in-progress",
        dueDate: "2023-06-30",
      },
      {
        id: "2",
        title: "Buy groceries",
        description: "Get milk, eggs, bread, and vegetables",
        priority: "medium",
        status: "todo",
        dueDate: "2023-06-25",
      },
      {
        id: "3",
        title: "Go for a run",
        description: "Complete 5km run in the park",
        priority: "low",
        status: "done",
        dueDate: "2023-06-24",
      },
    ])
  }, [])

  if (status === "loading") return <div>Loading...</div>
  if (status === "unauthenticated") return <div>Access Denied</div>

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <AppHeader />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-8">All Todos</h1>
        <TodoList todos={todos} setTodos={setTodos} />
      </main>
    </div>
  )
}

