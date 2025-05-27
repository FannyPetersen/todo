import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState<string>("")
  
  const handleAddTodo = () => {
    if (input.trim() === "") return
    setTodos([...todos, input]) 
    setInput("") 
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
            {todo}
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
