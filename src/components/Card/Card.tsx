import React, { useState } from "react";
import { Todo } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { todoChecked, todoCreated, todoDeleted } from "../../redux/sliceTodo";
import TodoItem from "../TodoItem/TodoItem";
import Filter from "../Filter/Filter";
import AddTask from "../AddTask/AddTask";

import "./card.scss";

const Card = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTodos = (todos: Todo[], filter: string) => {
    switch (filter) {
      case "all":
        return todos;
      case "completed":
        return todos.filter((item) => item.checked === true);
      case "progress":
        return todos.filter((item) => item.checked === false);
      default:
        return todos;
    }
  };

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim() !== "") {
      dispatch(
        todoCreated({
          id: Date.now(),
          todo: newTodo,
          checked: false,
        })
      );
      setNewTodo("");
    }
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const id = Number(event.target.value);

    dispatch(todoChecked(id));
  };

  const handleRemove = (id: number): void => {
    dispatch(todoDeleted(id));
  };

  const visibleData = filteredTodos(todos, filter);

  return (
    <div className="card">
      <h1 className="name">Todo</h1>
      <AddTask newTodo={newTodo} handleAdd={handleAdd} setNewTodo={setNewTodo} />
      <Filter setFilter={setFilter} />
      <ul className="tasks">
        {visibleData.map((todo) => (
          <TodoItem key={todo.id} {...todo} handleCheck={handleCheck} handleRemove={handleRemove} />
        ))}
      </ul>
    </div>
  );
};

export default Card;
