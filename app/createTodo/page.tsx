"use client"

import React, { useState } from "react"
import { Plus, Menu } from "lucide-react"
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
import { AppHeader } from "@/components/app-header"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export interface Todo {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in-progress" | "done"
  dueDate: string
}

const TodoForm = ({ newTodo, setNewTodo, handleAddTodo }: any) => (
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="title" className="text-right text-white">
        Title
      </Label>
      <Input
        id="title"
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        className="col-span-3 bg-gray-900 border-gray-700"
      />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="description" className="text-right text-white">
        Description
      </Label>
      <Textarea
        id="description"
        value={newTodo.description}
        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        className="col-span-3 bg-gray-900 border-gray-700"
      />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="priority" className="text-right text-white">
        Priority
      </Label>
      <Select
        onValueChange={(value) => setNewTodo({ ...newTodo, priority: value as Todo["priority"] })}
        defaultValue={newTodo.priority}
      >
        <SelectTrigger className="col-span-3 bg-gray-900 border-gray-700">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700">
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="status" className="text-right text-white">
        Status
      </Label>
      <Select
        onValueChange={(value) => setNewTodo({ ...newTodo, status: value as Todo["status"] })}
        defaultValue={newTodo.status}
      >
        <SelectTrigger className="col-span-3 bg-gray-900 border-gray-700">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700">
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="dueDate" className="text-right text-white">
        Due Date
      </Label>
      <Input
        id="dueDate"
        type="date"
        value={newTodo.dueDate}
        onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
        className="col-span-3 bg-gray-900 border-gray-700"
      />
    </div>
  </div>
)

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
    <div className="flex h-screen bg-black">
      <SidebarProvider>
        {/* Sidebar for desktop */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col h-full">
          {/* Header */}
          <div className="bg-black p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Mobile menu trigger */}
                <div className="md:hidden">
                  <SidebarTrigger>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SidebarTrigger>
                </div>

                {/* App title and add button */}
                <div className="flex items-center space-x-4">
                  <h1 className="text-xl font-bold text-white">TodoMaster</h1>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="hidden md:flex">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Todo
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="bg-black/95 border-t border-gray-800">
                      <SheetHeader>
                        <SheetTitle className="text-white">Add New Todo</SheetTitle>
                        <SheetDescription>Fill in the details for your new todo item.</SheetDescription>
                      </SheetHeader>
                      <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} handleAddTodo={handleAddTodo} />
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
              </div>

              {/* Mobile add button */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Plus className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="bg-black/95 border-t border-gray-800">
                    <SheetHeader>
                      <SheetTitle className="text-white">Add New Todo</SheetTitle>
                      <SheetDescription>Fill in the details for your new todo item.</SheetDescription>
                    </SheetHeader>
                    <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} handleAddTodo={handleAddTodo} />
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
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-auto p-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-centerh-screen justify-center">My Todos</h2>
                {/* <TodoList todos={todos} setTodos={setTodos} /> */}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}