import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "../common/todo.model";
import {TodoListService} from "../common/todo-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  todos: Todo[];
  allChecked: boolean;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    this.subscription = this.todoListService.onChange.subscribe(() => {
      this.todos = this.todoListService.getTodos();
    });
    this.todos = this.todoListService.getTodos();
    this.allChecked = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  markAll() {

  }

}
