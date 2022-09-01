import './App.css';
import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text: todo,
      completed: false
    }

    setTodos([newTodo, ...todos])
    setTodo("")
  }

  const deleteTodo = (id) => {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  const toggleComplete = (id) => {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  const applyEdit = (id) => {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
      }
      return todo
    }) 
    setTodos(updatedTodos)
    setTodoEditing(null)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(evt) => { setTodo(evt.target.value) }}
        />

        <button type="submit" >Добавить задачу</button>
      </form>
      {todos.map((todo) =>
        <div className='todo-row' key={todo.id}>
            <input
              type="checkbox"
              onClick={() => toggleComplete(todo.id)}
              checked={todo.completed} />
          <div
            className={(todo.completed) ? 'todo-row complete' : 'todo-row'}
          >
          

            {todoEditing === todo.id
              ? <input
                type = 'text'
                onChange = {(evt) => setEditingText(evt.target.value)}
                value = {editingText} />
              : <p>{todo.text}</p>
            }

          </div>

          <button onClick={() => {setTodoEditing(todo.id)
        setEditingText(todo.text)}
        
        }>Edit</button>
          <button onClick={() => applyEdit(todo.id)}>Apply edit</button>
          <button onClick={() => deleteTodo(todo.id)}>x</button>
        </div>


      )}
    </div>
  );
}

export default App;
