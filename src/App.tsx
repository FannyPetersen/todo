import { useState } from 'react'
import './App.css'

function App() {
  type Todo = {
    text: string;
    done: boolean;
  };
  
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState<string>("")
  
  const handleAddTodo = () => {
    if (input.trim() === "") return
    setTodos([...todos, { text: input, done: false }])
    setInput("") 
  }

  const handleToggleTodo = (idx: number) => {
    setTodos(todos.map((todo, i) =>
      i === idx ? { ...todo, done: !todo.done } : todo
    ))
  }

  const handleRemoveTodo = (removeIdx: number) => {
    setTodos(todos.filter((_, idx) => idx !== removeIdx))
  }

  return (
    <div className="app-container">
      <h1>What to do</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>
            <span
              onClick={() => handleToggleTodo(idx)}
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleRemoveTodo(idx)} style={{ marginLeft: '8px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
