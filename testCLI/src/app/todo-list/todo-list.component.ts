import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "../common/todo.model";
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {State} from "../reducers";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  todos: Todo[];
  editingTodo: Todo;
  allChecked: boolean;

  constructor(private router: Router,
              private store: Store<State>) {}

  ngOnInit() {
    this.subscription = this.store.select((state) => state.todoList).subscribe((state) => {
      this.todos = state.todoList;
      this.editingTodo = state.editingTodo;
      this.updateList();
    });
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.updateList();
      }
    });
    this.allChecked = false;
  }

  updateList() {
    if (this.router.url === '/active') {
      this.todos = this.todos.filter((todo) => {
        return !todo.completed;
      });
    }
    else if (this.router.url === '/completed') {
      this.todos = this.todos.filter((todo) => {
        return todo.completed;
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isEditingTodo(todo: Todo) {
    return todo === this.editingTodo;
  }

  markAll() {

  }

}
