import * as React from "react";
import { TodoItem, type Todo } from "@/components/ui/to-do-item";

const todosData: Todo[] = [
  { id: 1, title: "Complete documentation", completed: false },
  { id: 2, title: "Review pull requests", completed: false },
  { id: 3, title: "Update dependencies", completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = React.useState(todosData);
  const [show, setShow] = React.useState<number | null>(null);

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={handleToggle}
          onDelete={handleDelete}
          showActions={show}
          onShowActions={setShow}
        />
      ))}
    </div>
  );
}
