import { useState } from 'react';
import Todo from './Todo';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const newTodo = () =>{
    setTodos([...todos, input]);
    setInput('');
  }
  
  return (
    <main className="container p-5">
      <h1 className="fw-bold mb-4">📋 To-do List</h1>
      
      <label htmlFor="newtodo">Add a new task:</label>
      <input id="newtodo" type="text" value={input} className="form-control" onChange={(e)=>{
        setInput(e.target.value)
      }} />
      <button className="btn btn-primary mt-2" onClick={newTodo}>New Task</button>

      <div className="card mt-3 p-3">
        {
          todos.map((todo, index) => (
            <Todo todo={todo} index={index}  />
          ))
        }
      </div>

    </main>
  )

}

export default App
