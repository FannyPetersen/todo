import { useState, useEffect } from "react";
import "./App.css";
import Input from "./Input";
import Item from "./Item";
import { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (input: string) => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, done: false }]);
  };

  const handleToggleTodo = (idx: number) => {
    setTodos(
      todos.map((todo, i) => (i === idx ? { ...todo, done: !todo.done } : todo))
    );
  };

  const handleUpdateTodo = (idx: number, newText: string) => {
    setTodos(
      todos.map((todo, i) => (i === idx ? { ...todo, text: newText } : todo))
    );
  };

  const handleRemoveTodo = (removeIdx: number) => {
    setTodos(todos.filter((_, idx) => idx !== removeIdx));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.done));
  };

  const hasCompleted = todos.some((todo) => todo.done);

  return (
    <div className="app-container">
      <h1>What to do?</h1>
      <Input
        addTodo={handleAddTodo}
        clearCompleted={clearCompleted}
        hasCompleted={hasCompleted}
      />
      <ul>
        {todos.length === 0 ? (
          <li className="empty-placeholder">Nothing to do.</li>
        ) : (
          todos.map((todo, idx) => (
            <Item
              todo={todo}
              idx={idx}
              toggleTodo={handleToggleTodo}
              updateTodo={handleUpdateTodo}
              removeTodo={handleRemoveTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
