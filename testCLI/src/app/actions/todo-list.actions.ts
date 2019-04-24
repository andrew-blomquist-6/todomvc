import { Action } from '@ngrx/store';
import {Todo} from "../common/todo.model";

export enum TodoListActionTypes {
  LoadTodoList = '[TodoList] Load Todo List',
  AddTodo = '[TodoList] Add Todo',
  UpdateTodo = '[TodoList] Update Todo',
  RemoveTodo = '[TodoList] Remove Todo',
  RemoveCompleted = '[TodoList] Remove Completed',
  UpdateEditingTodo = '[TodoList] Update Editing Todo'
}

export class LoadTodoList implements Action {
  readonly type = TodoListActionTypes.LoadTodoList;

  constructor(public todoList: Array<Todo>) {}
}

export class AddTodo implements Action {
  readonly type = TodoListActionTypes.AddTodo;

  constructor(public todo: Todo) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoListActionTypes.UpdateTodo;

  constructor(public todo: Todo, public index: number) {}
}

export class RemoveTodo implements Action {
  readonly type = TodoListActionTypes.RemoveTodo;

  constructor(public index: number) {}
}

export class RemoveCompleted implements Action {
  readonly type = TodoListActionTypes.RemoveCompleted;
}

export class UpdateEditingTodo implements Action {
  readonly type = TodoListActionTypes.UpdateEditingTodo;

  constructor(public todo: Todo) {}
}

export type TodoListActions = LoadTodoList |
  AddTodo |
  UpdateTodo |
  RemoveTodo |
  RemoveCompleted |
  UpdateEditingTodo;
