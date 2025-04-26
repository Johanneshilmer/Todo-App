import { useState } from "react";

interface ListProps {
  todos: { todo: string }[];
  handleDelete: (index: number) => void;
  handleEdit: (index: number) => void;
  edited: null | number;
  setEdited: React.Dispatch<React.SetStateAction<null | number>>;
  setTodos: React.Dispatch<React.SetStateAction<{ todo: string }[]>>;
}

export default function ({
  todos,
  handleDelete,
  handleEdit,
  edited,
  setEdited,
  setTodos,
}: ListProps) {
  const [editedTodo, setEditedTodo] = useState<string>("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (edited !== null) {
      const updatedTodos = [...todos];
      updatedTodos[edited].todo = editedTodo;
      setTodos(updatedTodos);
      setEdited(null);
      setEditedTodo("");
    }
  };

  return (
    <div className="list-container">
      {todos.map((item, index) => (
        <li key={index}>
          {edited !== index ? (
            <>
              <span>{item.todo}</span>
              <div className="btn-container">
                <button
                  className="btn-edit"
                  onClick={() => {
                    handleEdit(index);
                    setEditedTodo(item.todo);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(index)}
                >
                  X
                </button>
              </div>
            </>
          ) : (
            <form className="edit-from" onSubmit={handleSave}>
              <input
                type="text"
                value={editedTodo}
                onChange={(e) => setEditedTodo(e.target.value)}
              />
              <button className="btn-save" type="submit">
                Save
              </button>
            </form>
          )}
        </li>
      ))}
    </div>
  );
}
