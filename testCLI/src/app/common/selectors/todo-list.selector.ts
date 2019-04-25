import {State} from "../reducers";

export const selectTodoList = (state: State) => state.todoList.list;

export const selectEditingTodo = (state: State) => state.todoList.editingTodo;
