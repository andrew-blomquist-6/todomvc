import { Action } from '@ngrx/store';
import {Todo} from "../todo.model";

export enum TodoListActionTypes {
  LoadTodoList = '[TodoList] Load Todo List',
  AddTodo = '[TodoList] Add Todo',
  UpdateTodo = '[TodoList] Update Todo',
  RemoveTodo = '[TodoList] Remove Todo',
  RemoveCompleted = '[TodoList] Remove Completed',
  UpdateEditingTodo = '[TodoList] Update Editing Todo',
  SaveToLocalStorage = '[TodoList] Save to Local Storage'
}

/*
  TODO: lookup the merits of using a payload object vs. what we're doing now
  aka: public payload: {todo: Todo, index: number}
 */

export class LoadTodoList implements Action {
  readonly type = TodoListActionTypes.LoadTodoList;
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

export class SaveToLocalStorage implements Action {
  readonly type = TodoListActionTypes.SaveToLocalStorage;
}

//TODO: is there a way to do this union any better?
export type TodoListActions = LoadTodoList |
  AddTodo |
  UpdateTodo |
  RemoveTodo |
  RemoveCompleted |
  UpdateEditingTodo |
  SaveToLocalStorage;
