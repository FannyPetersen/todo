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
      <Input addTodo={handleAddTodo} hasCompleted={hasCompleted} />
      <ul>
        {todos.length === 0 ? (
          <div className="empty-placeholder">Nothing to do.</div>
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
      {hasCompleted && (
        <button
          onClick={clearCompleted}
          style={{
            visibility: hasCompleted ? "visible" : "hidden",
            background: "#f8e1e7",
            border: "none",
            padding: "8px 14px",
            borderRadius: "4px",
            cursor: hasCompleted ? "pointer" : "default",
            color: "#b85c7c",
            fontWeight: 500,
            fontSize: "1rem",
            transition: "background 0.2s",
            marginLeft: "8px",
          }}
          aria-hidden={!hasCompleted}
          disabled={!hasCompleted}
          onMouseOver={(e) => {
            if (hasCompleted) e.currentTarget.style.background = "#e6bfcf";
          }}
          onMouseOut={(e) => {
            if (hasCompleted) e.currentTarget.style.background = "#f8e1e7";
          }}
        >
          Clear completed
        </button>
      )}
    </div>
  );
}

export default App;
