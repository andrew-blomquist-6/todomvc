import {EventEmitter, Injectable} from '@angular/core';
import {Todo} from "./todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  public onChange: EventEmitter<any>;

  private todos: Todo[];

  constructor() {
    this.todos = [];
    this.onChange = new EventEmitter<any>();
  }

  getTodos() {
    return this.todos.slice();
  }

  getTodo(index: number) {
    return this.todos[index];
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.onChange.emit();
  }

  updateTodo(index: number, todo: Todo) {
    this.todos[index] = todo;
    this.onChange.emit();
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.onChange.emit();
  }

  countRemainingTodos() {
    let counter = 0;
    for(let todo of this.todos) {
      if(!todo.completed) {
        counter++;
      }
    }
    return counter;
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => {
      return !todo.completed;
    });
    this.onChange.emit();
  }
}
