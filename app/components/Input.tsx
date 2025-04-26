import React from "react";

interface InputProps {
  handleAdd: (e: React.FormEvent) => void;
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input({ handleAdd, todo, setTodo }: InputProps) {
  return (
    <form className="input-form" action="" onSubmit={handleAdd}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button>Add</button>
    </form>
  );
}
