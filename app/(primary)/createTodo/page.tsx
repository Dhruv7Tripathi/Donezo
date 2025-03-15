"use client"

import React, { useEffect, useState } from "react"
import { Plus, Menu, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import axios, { AxiosError } from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner";
import Header from "@/components/header"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/darkmode"
export interface Todo {
  id: string
  userId: string
  title: string
  description?: string
  priority: "High" | "Medium" | "Low"
  status: "ToDo" | "InProgress" | "Done"
  duedate: string
  createdAt: Date
}
interface TodoFormProps {
  newTodo: Omit<Todo, "id" | "userId" | "createdAt">;
  setNewTodo: (todo: Omit<Todo, "id" | "userId" | "createdAt">) => void;
  handleAddTodo: () => Promise<void>;
}
const TodoForm = ({ newTodo, setNewTodo }: TodoFormProps) => (
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
        value={newTodo.priority}
        onValueChange={(value) => setNewTodo({ ...newTodo, priority: value as Todo["priority"] })}
      >
        <SelectTrigger className="col-span-3 bg-gray-900 border-gray-700">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700">
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="status" className="text-right text-white">
        Status
      </Label>
      <Select
        value={newTodo.status}
        onValueChange={(value) => setNewTodo({ ...newTodo, status: value as Todo["status"] })}
      >
        <SelectTrigger className="col-span-3 bg-gray-900 border-gray-700">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700">
          <SelectItem value="ToDo">To Do</SelectItem>
          <SelectItem value="InProgress">In Progress</SelectItem>
          <SelectItem value="Done">Done</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="duedate" className="text-right text-white">
        Due Date
      </Label>
      <Input
        id="duedate"
        type="date"
        value={newTodo.duedate}
        onChange={(e) => setNewTodo({ ...newTodo, duedate: e.target.value })}
        className="col-span-3 bg-gray-900 border-gray-700"
      />
    </div>
  </div>
)

export default function TodoPage() {
  const { data: session, status } = useSession()
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [newTodo, setNewTodo] = useState<Omit<Todo, "id" | "userId" | "createdAt">>({
    title: "",
    description: "",
    priority: "Medium",
    status: "ToDo",
    duedate: new Date().toISOString().split('T')[0]
  })
  // const router = useRouter()

  useEffect(() => {
    const fetchTodos = async () => {
      if (session?.user?.id) {
        try {
          setIsLoading(true)
          const response = await axios.get(`/api/todo/fetch/${session.user.id}`)
          if (response.data) {
            setTodos(response.data)
          }
        } catch (error: unknown) {
          const axiosError = error as AxiosError<{ message?: string }>;
          const errorMessage = axiosError.response?.data?.message || "Failed to fetch todos";

          toast(errorMessage);
          console.error("Error fetching todos:", axiosError);
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchTodos()
  }, [session?.user?.id])


  const handleAddTodo = async () => {
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
        title: newTodo.title,
        description: newTodo.description,
        priority: newTodo.priority,
        status: newTodo.status,
        duedate: newTodo.duedate
      })

      if (response.data.success) {
        setTodos(prevTodos => [...prevTodos, response.data.data])
        setNewTodo({
          title: "",
          description: "",
          priority: "Medium",
          status: "ToDo",
          duedate: "",
        })
        toast("Todo added successfully")
      }
    } catch (error: unknown) {
      // const errorMessage = error.response?.data?.message || "Failed to add todo"
      // toast(errorMessage)
      // console.error("Error adding todo:", error)
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || "Failed to add todos";

      toast(errorMessage);
      console.error("Error add todos:", axiosError);
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
    } catch (error: unknown) {
      // const errorMessage = error.response?.data?.message || "Failed to delete todo"
      // toast(errorMessage)
      // console.error("Error deleting todo:", error)
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || "Failed to delete todos";

      toast(errorMessage);
      console.error("Error delete todos:", axiosError);
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
                  {/* <Image src="/l2.webp" alt="logo" className="h-10 w-10 mr-3 rounded-full border border-gray-200" height={10} width={10} /> */}
                  <h1 className="text-xl font-bold text-white">Donezo</h1>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute text-white right-4 top-4 rounded-2xl font-semibold hover:bg-grey700 md:right-8 md:top-4 hidden md:flex"
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
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center"><Header />
                  <br />
                  <p className="p-4 text-center text-white">My Todo&apos;s are below here👇</p>
                </h2>
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
                            <span className={`text-sm px-2 py-1 rounded ${todo.priority === "High"
                              ? "bg-red-900/50 text-red-200"
                              : todo.priority === "Medium"
                                ? "bg-yellow-900/50 text-yellow-200"
                                : "bg-green-900/50 text-green-200"
                              }`}>
                              {todo.priority}
                            </span>
                            <span className="text-sm px-2 py-1 rounded bg-gray-800 text-gray-200">
                              {todo.status}
                            </span>
                            <span className="text-sm px-2 py-1 rounded bg-gray-800 text-gray-200">
                              {new Date(todo.duedate).toLocaleDateString()}  {/* Changed from dueDate to duedate */}
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