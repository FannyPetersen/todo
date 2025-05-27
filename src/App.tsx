import { useState } from 'react'
import './App.css'

function App() {
  // State to store the list of todos (array of strings)
  const [todos, setTodos] = useState<string[]>([])
  // State to store the current value of the input field
  const [input, setInput] = useState<string>("")

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    if (input.trim() === "") return // Prevent adding empty todos
    setTodos([...todos, input]) // Add the new todo to the list
    setInput("") // Clear the input field
  }

  return (
    <div className="app-container">
      <h1>What to do</h1>
      {/* Input field for new todos */}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      {/* Button to add the todo */}
      <button onClick={handleAddTodo}>Add</button>
      {/* List of todos */}
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>{todo}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
