"use client";
import List from "./components/List";
import Input from "./components/Input";
import { useState, useEffect, use } from "react";

export default function Home() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<{ todo: string }[]>([]);
  const [edited, setEdited] = useState<null | number>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      setTodos([...todos, { todo }]);
      setTodo("");
    }
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setEdited(index);
  };

  const handleClear = () => {
    setTodos([]);
    localStorage.removeItem("todos");
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Todo App</h1>
      </div>
      <div className="input-list">
        <Input handleAdd={handleAdd} todo={todo} setTodo={setTodo} />
        <List
          todos={todos}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          edited={edited}
          setTodos={setTodos}
          setEdited={setEdited}
        />
        <div className="footer">
          <div>
            <span>
              You have {todos.length} pending{" "}
              {todos.length > 1 ? "tasks" : "task"}
            </span>
          </div>
          <div>
            <button onClick={handleClear}>Clear All</button>
          </div>
        </div>
      </div>
    </div>
  );
}
