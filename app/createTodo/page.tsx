"use client"

import React, { useEffect, useState } from "react"
import { Plus, Menu, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner";
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
  const [isLoading, setIsLoading] = useState(false)
  const [newTodo, setNewTodo] = useState<Omit<Todo, "id">>({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  })
  const router = useRouter()

  useEffect(() => {
    const fetchTodos = async () => {
      if (session?.user?.id) {
        try {
          const response = await axios.get(`/api/todo/${session.user.id}`)
          setTodos(response.data)
        } catch (error) {
          toast("Failed to fetch todos")
        }
      }
    }
    fetchTodos()
  }, [session?.user?.id])



  const handleAddTodo = async () => {
    // Add validation
    if (!newTodo.title) {
      toast("Title is required")
      return
    }

    if (!session) {
      toast("User session not found")
      return
    }
    try {
      setIsLoading(true)
      const response = await axios.post("/api/todo/add", {
        userId: session.user.id,
        todo: newTodo  // Changed from newTodo to todo to match API expectation
      })

      if (response.data) {
        setTodos(prevTodos => [...prevTodos, response.data])
        setNewTodo({
          title: "",
          description: "",
          priority: "medium",
          status: "todo",
          dueDate: "",
        })
        toast("Todo added successfully")
      }
    } catch (error: any) {
      // Improved error handling
      const errorMessage = error.response?.data?.message || "Failed to add todo"
      toast(errorMessage)
      console.error("Error adding todo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/todo/delete/${id}`)
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
      toast("Todo deleted successfully")
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to delete todo"
      toast(errorMessage)
      console.error("Error deleting todo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") return <div>Loading...</div>
  if (status === "unauthenticated") return <div>Access Denied</div>

  return (
    <div className="flex h-screen bg-black">
      <SidebarProvider className="bg-black">
        <div className="hidden md:block">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col h-full">
          <div className="bg-black p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="md:hidden">
                  <SidebarTrigger>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SidebarTrigger>
                </div>
                <div className="flex items-center space-x-4">
                  <h1 className="text-xl font-bold text-white">Donezo</h1>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute right-4 top-4 rounded-2xl font-semibold hover:bg-grey700 md:right-8 md:top-4 hidden md:flex"
                        disabled={isLoading}
                      >
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
                          <Button type="submit" onClick={handleAddTodo} disabled={isLoading}>
                            {isLoading ? "Adding..." : "Add Todo"}
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" disabled={isLoading}>
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
                        <Button
                          type="submit"
                          onClick={handleAddTodo}
                          variant="secondary"
                          className="w-full rounded-full font-semibold py-3 hover:opacity-90 transition"
                          disabled={isLoading}
                        >
                          {isLoading ? "Adding..." : "Add Todo"}
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
          <main className="flex-1 overflow-auto p-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">My Todos</h2>
                {todos.length === 0 ? (
                  <p className="text-gray-400 mt-6 text-center">No todos found.</p>
                ) : (
                  <div className="space-y-4">
                    {todos.map((todo) => (
                      <div key={todo.id} className="p-4 border border-gray-700 bg-gray-900 rounded-md flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{todo.title}</h3>
                          <p className="text-gray-400 mt-1">{todo.description}</p>
                          <div className="flex gap-4 mt-2">
                            <span className={`text-sm px-2 py-1 rounded ${todo.priority === "high"
                              ? "bg-red-900/50 text-red-200"
                              : todo.priority === "medium"
                                ? "bg-yellow-900/50 text-yellow-200"
                                : "bg-green-900/50 text-green-200"
                              }`}>
                              {todo.priority}
                            </span>
                            <span className="text-sm px-2 py-1 rounded bg-gray-800 text-gray-200">
                              {todo.status}
                            </span>
                            <span className="text-sm px-2 py-1 rounded bg-gray-800 text-gray-200">
                              {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTodo(todo.id)}
                          disabled={isLoading}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}