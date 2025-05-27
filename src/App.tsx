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
      <button onClick={handleAddTodo} aria-label="Add todo">
        {/* Plus SVG icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
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
            <button onClick={() => handleRemoveTodo(idx)} style={{ marginLeft: '8px' }} aria-label="Delete todo">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
