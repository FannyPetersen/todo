import { useState } from "react";

interface InputProps {
  addTodo: (text: string) => void;
  hasCompleted: boolean;
}

export default function Input({ addTodo, hasCompleted }: InputProps) {
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
    </div>
  );
}
