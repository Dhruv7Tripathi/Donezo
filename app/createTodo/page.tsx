"use client"

import React, { useState } from "react"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
// import { TodoList } from "@/components/todo-list"
import { AppHeader } from "@/components/app-header"

export interface Todo {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in-progress" | "done"
  dueDate: string
}

export default function TodoPage() {
  const { data: session, status } = useSession()
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState<Omit<Todo, "id">>({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  })

  const handleAddTodo = () => {
    const todo: Todo = {
      id: Date.now().toString(),
      ...newTodo,
    }
    setTodos([...todos, todo])
    setNewTodo({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      dueDate: "",
    })
  }

  if (status === "loading") return <div>Loading...</div>
  if (status === "unauthenticated") return <div>Access Denied</div>

  return (
    <div className="min-h-screen bg-gradient-to-r">
      <AppHeader />
      <main className="container mx-auto p-4">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">My Todos</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="lg">
                <Plus className="mr-2 h-4 w-4" /> Add Todo
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Todo</SheetTitle>
                <SheetDescription>Fill in the details for your new todo item.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select
                    onValueChange={(value) => setNewTodo({ ...newTodo, priority: value as Todo["priority"] })}
                    defaultValue={newTodo.priority}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    onValueChange={(value) => setNewTodo({ ...newTodo, status: value as Todo["status"] })}
                    defaultValue={newTodo.status}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Due Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTodo.dueDate}
                    onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" onClick={handleAddTodo}>
                    Add Todo
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        {/* <TodoList todos={todos} setTodos={setTodos} /> */}
      </main>
    </div>
  )
}

