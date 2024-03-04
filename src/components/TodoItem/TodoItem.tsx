import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { todoEdited } from "../../redux/sliceTodo";
import deleteBtn from "../../assets/delete.svg";
import editBtn from "../../assets/edit.svg";
import "./todoItem.scss";

interface Props {
  id: number;
  todo: string;
  checked: boolean;
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: (id: number) => void;
}

const TodoItem = ({ id, todo, checked, handleCheck, handleRemove }: Props) => {
  const dispatch = useAppDispatch();
  const [editTodo, setEditTodo] = useState("");
  const [editForm, setEditForm] = useState(false);

  const handleEditTodo = (
    event: React.FormEvent<HTMLFormElement>,
    id: number,
    editTodo: string
  ): void => {
    event.preventDefault();

    if (editTodo.trim() !== "") {
      dispatch(todoEdited({ id, editTodo }));

      setEditForm(!editForm);
      setEditTodo("");
    }
  };

  const returnForm = () => (
    <form className="edit" onSubmit={(event) => handleEditTodo(event, id, editTodo)}>
      <input
        type="text"
        className="edit-input"
        value={editTodo}
        onChange={(event) => setEditTodo(event.target.value)}
        name="name"
      />
      <input type="submit" value="Save" className="edit-button" />
    </form>
  );

  const returnTodo = () => (
    <>
      <div className="info">
        <input type="checkbox" checked={checked} value={id} onChange={handleCheck} />
        <h3 className="name">{todo}</h3>
      </div>
      <div className="settings">
        <button className="button" onClick={() => handleRemove(id)}>
          <img className="button-img" src={deleteBtn} alt={deleteBtn} />
        </button>
        <button className="button" onClick={() => setEditForm(!editForm)}>
          <img className="button-img" src={editBtn} alt={editBtn} />
        </button>
      </div>
    </>
  );

  return <div className="todo">{!editForm ? returnTodo() : returnForm()}</div>;
};

export default TodoItem;
