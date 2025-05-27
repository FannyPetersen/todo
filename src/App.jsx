import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")
  
  const handleAddTodo = () => {
    if (input.trim() === "") return
    setTodos([...todos, input])
    setInput("")
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
          <li key={idx}>{todo}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
