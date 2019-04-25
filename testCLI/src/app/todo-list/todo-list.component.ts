import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "../common/todo.model";
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {State} from "../common/reducers";
import {selectEditingTodo, selectTodoList} from "../common/selectors/todo-list.selector";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editingTodoSubscription: Subscription;
  todos: Todo[];
  editingTodo: Todo;
  allChecked: boolean;

  constructor(private router: Router,
              private store: Store<State>) {}

  ngOnInit() {
    this.editingTodoSubscription = this.store.select(selectEditingTodo).subscribe((todo) => {
      this.editingTodo = todo;
    });
    this.subscription = this.store.select(selectTodoList).subscribe((list) => {
      this.todos = list;
      this.updateList();
    });
    this.router.events.subscribe((event) => {
      //angular should take care of un-subscribing from this one
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
    this.editingTodoSubscription.unsubscribe();
  }

  isEditingTodo(todo: Todo) {
    return todo === this.editingTodo;
  }

  markAll() {

  }

}
