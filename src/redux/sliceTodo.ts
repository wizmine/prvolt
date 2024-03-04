import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types";

const db = [
  {
    id: 23,
    todo: "make smth",
    checked: false,
  },
  {
    id: 24,
    todo: "fadfa",
    checked: false,
  },
  {
    id: 25,
    todo: "hdasjhvx",
    checked: false,
  },
];

interface InitialState {
  todos: Todo[];
}

const initialState: InitialState = {
  todos: db,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoCreated: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    todoDeleted: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    todoChecked: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((item) =>
        item.id === action.payload ? { ...item, checked: !item.checked } : item
      );
    },
    todoEdited: (state, action: PayloadAction<{ id: number; editTodo: string }>) => {
      state.todos = state.todos.map((item) =>
        item.id === action.payload.id ? { ...item, todo: action.payload.editTodo } : item
      );
    },
  },
});

export const { todoCreated, todoDeleted, todoChecked, todoEdited } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
