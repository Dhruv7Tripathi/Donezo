"use client"

import { useEffect, useState } from "react"
import { Plus, Menu, Trash2, Edit, CheckCircle, Clock, Calendar } from "lucide-react"
import { useSession } from "next-auth/react"
import axios, { type AxiosError } from "axios"
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
import { toast } from "sonner"
import Header from "@/components/landingpages/header"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/(secondary)/app-sidebar"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format, isBefore, parseISO } from "date-fns"

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
  todo: Omit<Todo, "id" | "userId" | "createdAt">
  setTodo: (todo: Omit<Todo, "id" | "userId" | "createdAt">) => void
  handleSubmit: () => Promise<void>
  isSubmitting: boolean
  mode: "add" | "edit"
}

const TodoForm = ({ todo, setTodo, handleSubmit, isSubmitting, mode }: TodoFormProps) => (
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="title" className="text-right text-white">
        Title
      </Label>
      <Input
        id="title"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        className="col-span-3 bg-gray-900 border-gray-700"
      />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="description" className="text-right text-white">
        Description
      </Label>
      <Textarea
        id="description"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        className="col-span-3 bg-gray-900 border-gray-700"
      />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="priority" className="text-right text-white">
        Priority
      </Label>
      <Select
        value={todo.priority}
        onValueChange={(value) => setTodo({ ...todo, priority: value as Todo["priority"] })}
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
      <Select value={todo.status} onValueChange={(value) => setTodo({ ...todo, status: value as Todo["status"] })}>
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
        value={todo.duedate}
        onChange={(e) => setTodo({ ...todo, duedate: e.target.value })}
        className="col-span-3 bg-gray-900 border-gray-700"
      />
    </div>
  </div>
)

const TodoSkeleton = () => (
  <Card className="bg-gray-900 border-gray-700">
    <CardHeader className="pb-2">
      <Skeleton className="h-6 w-3/4 bg-gray-800" />
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-5/6 bg-gray-800" />
      <Skeleton className="h-4 w-4/6 bg-gray-800" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full bg-gray-800" />
        <Skeleton className="h-6 w-20 rounded-full bg-gray-800" />
        <Skeleton className="h-6 w-24 rounded-full bg-gray-800" />
      </div>
    </CardContent>
    <CardFooter className="flex justify-between px-6">
      <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
    </CardFooter>
  </Card>
)

export default function TodoPage() {
  const { data: session, status } = useSession()
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newTodo, setNewTodo] = useState<Omit<Todo, "id" | "userId" | "createdAt">>({
    title: "",
    description: "",
    priority: "Medium",
    status: "ToDo",
    duedate: new Date().toISOString().split("T")[0],
  })
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  useEffect(() => {
    const fetchTodos = async () => {
      if (session?.user?.id) {
        try {
          setIsLoading(true)
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const response = await axios.get(`/api/todo/fetch/${session.user.id}`)
          if (response.data) {
            setTodos(response.data)
          }
        } catch (error: unknown) {
          const axiosError = error as AxiosError<{ message?: string }>
          const errorMessage = axiosError.response?.data?.message || "Failed to fetch todos"
          toast.error(errorMessage)
          console.error("Error fetching todos:", axiosError)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchTodos()
  }, [session?.user?.id])

  const handleAddTodo = async () => {
    if (!newTodo.title) {
      toast.error("Title is required")
      return
    }

    if (!session) {
      toast.error("User session not found")
      return
    }

    try {
      setIsSubmitting(true)
      const response = await axios.post("/api/todo/add", {
        userId: session.user.id,
        title: newTodo.title,
        description: newTodo.description,
        priority: newTodo.priority,
        status: newTodo.status,
        duedate: newTodo.duedate,
      })

      if (response.data.success) {
        setTodos((prevTodos) => [...prevTodos, response.data.data])
        setNewTodo({
          title: "",
          description: "",
          priority: "Medium",
          status: "ToDo",
          duedate: new Date().toISOString().split("T")[0],
        })
        toast.success("Todo added successfully")
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>
      const errorMessage = axiosError.response?.data?.message || "Failed to add todo"
      toast.error(errorMessage)
      console.error("Error adding todo:", axiosError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`/api/todo/delete/${id}`)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
      toast.success("Todo deleted successfully")
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>
      const errorMessage = axiosError.response?.data?.message || "Failed to delete todo"
      toast.error(errorMessage)
      console.error("Error deleting todo:", axiosError)
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: Todo["status"]) => {
    try {
      const response = await axios.patch(`/api/todo/update/${id}`, {
        status: newStatus,
      })

      if (response.data.success) {
        setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, status: newStatus } : todo)))
        toast.success("Todo status updated")
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>
      const errorMessage = axiosError.response?.data?.message || "Failed to update todo"
      toast.error(errorMessage)
      console.error("Error updating todo:", axiosError)
    }
  }

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo)
    setIsEditDialogOpen(true)
  }

  const handleUpdateTodo = async () => {
    if (!editingTodo) return

    if (!editingTodo.title) {
      toast.error("Title is required")
      return
    }

    try {
      setIsSubmitting(true)
      const response = await axios.patch(`/api/todo/update/${editingTodo.id}`, {
        title: editingTodo.title,
        description: editingTodo.description,
        priority: editingTodo.priority,
        status: editingTodo.status,
        duedate: editingTodo.duedate,
      })

      if (response.data.success) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === editingTodo.id ? { ...todo, ...response.data.data } : todo)),
        )
        setIsEditDialogOpen(false)
        toast.success("Todo updated successfully")
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>
      const errorMessage = axiosError.response?.data?.message || "Failed to update todo"
      toast.error(errorMessage)
      console.error("Error updating todo:", axiosError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "all") return true
    if (activeTab === "todo") return todo.status === "ToDo"
    if (activeTab === "inprogress") return todo.status === "InProgress"
    if (activeTab === "completed") return todo.status === "Done"
    if (activeTab === "high") return todo.priority === "High"
    if (activeTab === "overdue") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return todo.status !== "Done" && isBefore(parseISO(todo.duedate), today)
    }
    return true
  })

  const getPriorityColor = (priority: string) => {
    if (priority === "High") return "bg-red-900/50 text-red-200 border-red-700"
    if (priority === "Medium") return "bg-yellow-900/50 text-yellow-200 border-yellow-700"
    return "bg-green-900/50 text-green-200 border-green-700"
  }

  const getStatusColor = (status: string) => {
    if (status === "ToDo") return "bg-blue-900/50 text-blue-200 border-blue-700"
    if (status === "InProgress") return "bg-purple-900/50 text-purple-200 border-purple-700"
    return "bg-green-900/50 text-green-200 border-green-700"
  }

  const getStatusIcon = (status: string) => {
    if (status === "ToDo") return <Clock className="h-3.5 w-3.5 mr-1" />
    if (status === "InProgress") return <Edit className="h-3.5 w-3.5 mr-1" />
    return <CheckCircle className="h-3.5 w-3.5 mr-1" />
  }

  const isDueDateOverdue = (duedate: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return isBefore(parseISO(duedate), today)
  }

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    // First sort by status (ToDo first, then InProgress, then Done)
    const statusOrder = { ToDo: 0, InProgress: 1, Done: 2 }
    const statusDiff = statusOrder[a.status] - statusOrder[b.status]
    if (statusDiff !== 0) return statusDiff

    // Then sort by priority (High first, then Medium, then Low)
    const priorityOrder = { High: 0, Medium: 1, Low: 2 }
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
    if (priorityDiff !== 0) return priorityDiff

    // Then sort by due date (earliest first)
    return new Date(a.duedate).getTime() - new Date(b.duedate).getTime()
  })

  const overdueCount = todos.filter((todo) => todo.status !== "Done" && isDueDateOverdue(todo.duedate)).length

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32 bg-gray-800" />
          <Skeleton className="h-4 w-48 bg-gray-800" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-black">
      <SidebarProvider className="bg-black">
        <div className="hidden md:block">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col h-full">
          <div className="bg-gray-900/80 p-4 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-sm">
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
                  <h1 className="text-xl font-bold text-white flex items-center">
                    Donezo
                    <Badge variant="outline" className="ml-2 bg-gray-800 text-gray-200">
                      {todos.length} Tasks
                    </Badge>
                    {overdueCount > 0 && (
                      <Badge variant="outline" className="ml-2 bg-red-900/50 text-red-200 border-red-700">
                        {overdueCount} Overdue
                      </Badge>
                    )}
                  </h1>
                </div>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full font-semibold text-white hover:bg-gray-800 border-gray-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Task
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-black/95 border-l border-gray-800 w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-white">Add New Todo</SheetTitle>
                    <SheetDescription>Fill in the details for your new todo item.</SheetDescription>
                  </SheetHeader>
                  <TodoForm
                    todo={newTodo}
                    setTodo={setNewTodo}
                    handleSubmit={handleAddTodo}
                    isSubmitting={isSubmitting}
                    mode="add"
                  />
                  <SheetFooter className="mt-4">
                    <SheetClose asChild>
                      <Button
                        type="submit"
                        onClick={handleAddTodo}
                        disabled={isSubmitting}
                        className="w-full rounded-full"
                      >
                        {isSubmitting ? "Adding..." : "Add Todo"}
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <main className="flex-1 overflow-auto p-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6 text-center">
                <Header />
              </div>

              <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-6 mb-4 bg-gray-900 border border-gray-800">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="todo">To Do</TabsTrigger>
                  <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="high">High Priority</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  {isLoading ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {[...Array(4)].map((_, index) => (
                        <TodoSkeleton key={index} />
                      ))}
                    </div>
                  ) : sortedTodos.length === 0 ? (
                    <div className="text-center py-10">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 mb-4">
                        <CheckCircle className="h-8 w-8 text-gray-500" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">No tasks found</h3>
                      <p className="text-gray-400 mb-6">
                        {activeTab === "all"
                          ? "You don't have any tasks yet. Add your first one!"
                          : `No tasks in this category. Switch tabs or add a new task.`}
                      </p>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full font-semibold px-4 py-2 hover:bg-gray-800 border-gray-700"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Create a new task
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-black/95 border-l border-gray-800 w-full sm:max-w-md">
                          <SheetHeader>
                            <SheetTitle className="text-white">Add New Todo</SheetTitle>
                            <SheetDescription>Fill in the details for your new todo item.</SheetDescription>
                          </SheetHeader>
                          <TodoForm
                            todo={newTodo}
                            setTodo={setNewTodo}
                            handleSubmit={handleAddTodo}
                            isSubmitting={isSubmitting}
                            mode="add"
                          />
                          <SheetFooter className="mt-4">
                            <SheetClose asChild>
                              <Button
                                type="submit"
                                onClick={handleAddTodo}
                                disabled={isSubmitting}
                                className="w-full rounded-full"
                              >
                                {isSubmitting ? "Adding..." : "Add Todo"}
                              </Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {sortedTodos.map((todo) => (
                        <Card
                          key={todo.id}
                          className={`bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors ${todo.status !== "Done" && isDueDateOverdue(todo.duedate)
                            ? "border-l-4 border-l-red-600"
                            : ""
                            }`}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-white line-clamp-1">{todo.title}</h3>
                              <div className="flex space-x-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditTodo(todo)}
                                  className="text-gray-400 hover:text-blue-400 hover:bg-blue-950/20 -mt-1 -mr-1 h-8 w-8"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteTodo(todo.id)}
                                  className="text-gray-400 hover:text-red-400 hover:bg-red-950/20 -mt-1 -mr-2 h-8 w-8"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {todo.description && (
                              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{todo.description}</p>
                            )}
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge
                                variant="outline"
                                className={`${getPriorityColor(todo.priority)} flex items-center`}
                              >
                                {todo.priority}
                              </Badge>
                              <Badge variant="outline" className={`${getStatusColor(todo.status)} flex items-center`}>
                                {getStatusIcon(todo.status)}
                                {todo.status === "ToDo"
                                  ? "To Do"
                                  : todo.status === "InProgress"
                                    ? "In Progress"
                                    : "Done"}
                              </Badge>

                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-center gap-2 pt-0 pb-4">
                            {todo.status !== "ToDo" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-blue-950/20 hover:bg-blue-900/30 border-blue-900/50 text-blue-300 rounded-full"
                                onClick={() => handleUpdateStatus(todo.id, "ToDo")}
                              >
                                <Clock className="h-3.5 w-3.5 mr-1" /> To Do
                              </Button>
                            )}
                            {todo.status !== "InProgress" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-purple-950/20 hover:bg-purple-900/30 border-purple-900/50 text-purple-300 rounded-full"
                                onClick={() => handleUpdateStatus(todo.id, "InProgress")}
                              >
                                <Edit className="h-3.5 w-3.5 mr-1" /> In Progress
                              </Button>
                            )}
                            {todo.status !== "Done" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-950/20 hover:bg-green-900/30 border-green-900/50 text-green-300 rounded-full"
                                onClick={() => handleUpdateStatus(todo.id, "Done")}
                              >
                                <CheckCircle className="h-3.5 w-3.5 mr-1" /> Done
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </SidebarProvider>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>Make changes to your todo item. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {editingTodo && (
            <TodoForm
              todo={{
                title: editingTodo.title,
                description: editingTodo.description || "",
                priority: editingTodo.priority,
                status: editingTodo.status,
                duedate: editingTodo.duedate,
              }}
              setTodo={(updatedTodo) => setEditingTodo({ ...editingTodo, ...updatedTodo })}
              handleSubmit={handleUpdateTodo}
              isSubmitting={isSubmitting}
              mode="edit"
            />
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateTodo} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
