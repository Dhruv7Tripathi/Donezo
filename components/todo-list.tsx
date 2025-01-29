// "use client"

// import type React from "react"
// import type { Todo } from "../createTodo"
// import { Button } from "../components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

// interface TodoListProps {
//   todos: Todo[]
//   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
// }

// export function TodoList({ todos, setTodos }: TodoListProps) {
//   const handleDelete = (id: string) => {
//     setTodos(todos.filter((todo) => todo.id !== id))
//   }

//   const handleStatusChange = (id: string, newStatus: Todo["status"]) => {
//     setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status: newStatus } : todo)))
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {todos.map((todo) => (
//         <Card key={todo.id} className="w-full">
//           <CardHeader>
//             <CardTitle>{todo.title}</CardTitle>
//             <CardDescription>Due: {todo.dueDate}</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p>{todo.description}</p>
//             <div className="flex mt-2 space-x-2">
//               <Badge
//                 variant={
//                   todo.priority === "high" ? "destructive" : todo.priority === "medium" ? "default" : "secondary"
//                 }
//               >
//                 {todo.priority}
//               </Badge>
//               <Badge variant={todo.status === "done" ? "default" : "outline"}>{todo.status}</Badge>
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button variant="outline" onClick={() => handleDelete(todo.id)}>
//               Delete
//             </Button>
//             <select
//               value={todo.status}
//               onChange={(e) => handleStatusChange(todo.id, e.target.value as Todo["status"])}
//               className="p-2 border rounded"
//             >
//               <option value="todo">To Do</option>
//               <option value="in-progress">In Progress</option>
//               <option value="done">Done</option>
//             </select>
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   )
// }

