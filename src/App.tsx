import { useState } from 'react'
import './App.css'

function App() {
  type Todo = {
    text: string;
    done: boolean;
  };
  
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState<string>("")
  const [editingIdx, setEditingIdx] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState<string>("")

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

  const handleStartEdit = (idx: number, currentText: string) => {
    setEditingIdx(idx)
    setEditingValue(currentText)
  }
 
  const handleSaveEdit = () => {
    if (editingIdx === null) return
    setTodos(todos.map((todo, idx) => idx === editingIdx ? { ...todo, text: editingValue } : todo))
    setEditingIdx(null)
    setEditingValue("")
  }
  
  const handleCancelEdit = () => {
    setEditingIdx(null)
    setEditingValue("")
  }

  return (
    <div className="app-container">
      <h1>What to do</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add a new todo"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleAddTodo();
          }
        }}
      />
      <button onClick={handleAddTodo} aria-label="Add todo">
        {/* Plus SVG icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>
            {editingIdx === idx ? (
              <>
                <input
                  type="text"
                  value={editingValue}
                  onChange={e => setEditingValue(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSaveEdit()
                    if (e.key === 'Escape') handleCancelEdit()
                  }}
                  autoFocus
                  style={{ marginRight: '8px' }}
                />
                <button onClick={handleSaveEdit} aria-label="Save edit" style={{ marginRight: '4px' }}>
                  Save
                </button>
                <button onClick={handleCancelEdit} aria-label="Cancel edit">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => handleToggleTodo(idx)}
                  style={{
                    textDecoration: todo.done ? 'line-through' : 'none',
                    cursor: 'pointer',
                    userSelect: 'none',
                    marginRight: '8px',
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleStartEdit(idx, todo.text)} aria-label="Edit todo" style={{ marginRight: '4px' }}>
                  ✏️
                </button>
                <button onClick={() => handleRemoveTodo(idx)} style={{ marginLeft: '8px' }} aria-label="Delete todo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
