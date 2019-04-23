import {EventEmitter, Injectable} from '@angular/core';
import {Todo} from "./todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  public onChange: EventEmitter<any>;
  //toggle this boolean if you don't want to use local storage
  private useLocalStorage = true;
  private storageID = "todos-angular";
  private todos: Todo[];

  constructor() {
    if (this.useLocalStorage) {
      this.loadFromLocalStorage();
    } else {
      this.todos = [];
    }
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
    if (this.useLocalStorage) {
      this.saveToLocalStorage();
    }
    this.onChange.emit();
  }

  updateTodo(index: number, todo: Todo) {
    this.todos[index] = todo;
    if (this.useLocalStorage) {
      this.saveToLocalStorage();
    }
    this.onChange.emit();
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    if (this.useLocalStorage) {
      this.saveToLocalStorage();
    }
    this.onChange.emit();
  }

  countRemainingTodos() {
    let counter = 0;
    for (let todo of this.todos) {
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
    if (this.useLocalStorage) {
      this.saveToLocalStorage();
    }
    this.onChange.emit();
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageID, JSON.stringify(this.todos));
  }

  private loadFromLocalStorage() {
    this.todos = JSON.parse(localStorage.getItem(this.storageID));
    if(this.todos === null) {
      this.todos = [];
    }
  }
}
