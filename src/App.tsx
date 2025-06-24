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
      <h1>What to do?</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
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
          style={{ fontSize: '1rem', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '220px' }}
        />
      </div>
      <ul>
        {todos.length === 0 ? (
          <li className="empty-placeholder">
            Nothing to do.
          </li>
        ) : (
          todos.map((todo, idx) => (
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
                  <span className="todo-actions">
                    <button onClick={handleSaveEdit} aria-label="Save edit" style={{ marginRight: '4px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </button>
                    <button onClick={handleCancelEdit} aria-label="Cancel edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </span>
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
                  <span className="todo-actions">
                    <button onClick={() => handleStartEdit(idx, todo.text)} aria-label="Edit todo" style={{ marginRight: '4px' }}>
                      {/* Pencil SVG icon, black and white */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                    </button>
                    <button onClick={() => handleRemoveTodo(idx)} style={{ marginLeft: '8px' }} aria-label="Delete todo">
                      {/* Trashcan SVG icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                  </span>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
