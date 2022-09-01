import './App.css';
import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

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
        <div className = 'todo-list' key={todo.id}>
          <div
            className = {(todo.completed) ? 'todo-row-complete' : 'todo-row'}
            onClick = {() => toggleComplete(todo.id)}
          >

            <input type="checkbox" checked={todo.completed} />
            {todo.text}

          </div>
          <button onClick={() => deleteTodo(todo.id)}>x</button>
        </div>


      )}
    </div>
  );
}

export default App;
