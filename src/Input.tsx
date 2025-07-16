import { useState } from "react";

interface InputProps {
  addTodo: (text: string) => void;
  clearCompleted: () => void;
  hasCompleted: boolean;
}

export default function Input({
  addTodo,
  clearCompleted,
  hasCompleted,
}: InputProps) {
  const [input, setInput] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim() === "") return;
      addTodo(input);
      setInput("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "24px",
      }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        onKeyDown={handleKeyDown}
        style={{
          fontSize: "1rem",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          minWidth: "220px",
        }}
      />
      {hasCompleted && (
        <button
          onClick={clearCompleted}
          aria-label="Clear completed"
          style={{
            background: "#f8e1e7",
            border: "none",
            padding: "8px 14px",
            borderRadius: "4px",
            cursor: "pointer",
            color: "#b85c7c",
            fontWeight: 500,
            fontSize: "1rem",
            transition: "background 0.2s",
            marginLeft: "8px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#e6bfcf")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#f8e1e7")}
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
