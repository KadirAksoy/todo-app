import React, { useState } from "react";
import "./App.css"; 

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleStartEditing = (id, text) => {
    setEditingId(id);
    setEditingValue(text);
  };

  const handleUpdateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editingValue } : todo
      )
    );
    setEditingId(null);
    setEditingValue("");
  };

  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="container">
      <h1>ToDo App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Add new todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <h2>Active Todos</h2>
      <ul className="todo-list">
        {todos.map(
          (todo) =>
            !todo.completed && (
              <li key={todo.id} className="todo-item">
                {editingId === todo.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="edit-input"
                    />
                    <div className="edit-buttons">
                      <button onClick={handleUpdateTodo}>Update</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo.id)}
                    />
                    <span
                      className="todo-text"
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.text}
                    </span>
                    <div className="edit-buttons">
                      <button
                        onClick={() => handleStartEditing(todo.id, todo.text)}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteTodo(todo.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            )
        )}
      </ul>
      <h2>Completed Todos</h2>
      <ul className="todo-list">
        {completedTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <span
              className="todo-text"
              style={{ textDecoration: "line-through" }}
            >
              {todo.text}
            </span>
            <div className="edit-buttons">
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
