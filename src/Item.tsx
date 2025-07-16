import { useState, useEffect, useRef } from "react";
import { Todo } from "./types";

interface ItemProps {
  todo: Todo;
  idx: number;
  toggleTodo: (idx: number) => void;
  updateTodo: (idx: number, newText: string) => void;
  removeTodo: (idx: number) => void;
}

export default function Item({
  todo,
  idx,
  toggleTodo,
  updateTodo,
  removeTodo,
}: ItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const saveEdit = () => {
    if (editingValue.trim() === "") return;
    updateTodo(idx, editingValue);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditingValue(todo.text);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            autoFocus
            style={{ marginRight: "8px" }}
          />
          <span className="todo-actions">
            <button
              onClick={saveEdit}
              aria-label="Save edit"
              style={{ marginRight: "4px" }}
            >
              {/* Done SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
            <button onClick={cancelEdit} aria-label="Cancel edit">
              {/* Cancel SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </span>
        </>
      ) : (
        <>
          <span
            onClick={() => toggleTodo(idx)}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              cursor: "pointer",
              userSelect: "none",
              marginRight: "8px",
            }}
          >
            {todo.text}
          </span>
          <span className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              aria-label="Edit todo"
              style={{ marginRight: "4px" }}
            >
              {/* Pencil SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
              </svg>
            </button>
            <button
              onClick={() => removeTodo(idx)}
              aria-label="Delete todo"
              style={{ marginLeft: "8px" }}
            >
              {/* Trashcan SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </span>
        </>
      )}
    </li>
  );
}
