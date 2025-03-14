// pages/index.tsx or any page where you want to show the calendar
import React, { useState } from 'react';
import Calendar from '@/components/calender';
import { format } from 'date-fns'; // You'll need to install this package

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([
    // Sample todos
    { id: '1', title: 'Learn Next.js', completed: false, date: new Date() },
    { id: '2', title: 'Build Todo App', completed: true, date: new Date() },
    // Add more sample todos as needed
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newTodoTitle, setNewTodoTitle] = useState('');

  // Get todos for the selected date
  const todosForSelectedDate = todos.filter(todo => {
    const todoDate = new Date(todo.date);
    return (
      todoDate.getDate() === selectedDate.getDate() &&
      todoDate.getMonth() === selectedDate.getMonth() &&
      todoDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  // Create dates that have todos (for highlighting in the calendar)
  const datesWithTodos = todos.map(todo => new Date(todo.date));

  // Handle date selection from calendar
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Add new todo
  const addTodo = () => {
    if (newTodoTitle.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTodoTitle,
      completed: false,
      date: selectedDate
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
  };

  // Toggle todo completion
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Todo Application</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar section */}
        <div className="md:w-1/2">
          <h2 className="text-lg font-semibold mb-2">Calendar</h2>
          <Calendar
            onDateSelect={handleDateSelect}
            highlightDates={datesWithTodos}
          />
        </div>

        {/* Todo list section */}
        <div className="md:w-1/2">
          <h2 className="text-lg font-semibold mb-2">
            Todos for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>

          {/* Add new todo */}
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Add new todo..."
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {/* Todo list */}
          <div className="space-y-2">
            {todosForSelectedDate.length === 0 ? (
              <p className="text-gray-500">No todos for this date.</p>
            ) : (
              todosForSelectedDate.map(todo => (
                <div key={todo.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="mr-3 h-4 w-4"
                    />
                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                      {todo.title}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}