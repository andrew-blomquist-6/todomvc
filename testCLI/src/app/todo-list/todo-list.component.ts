import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "../common/todo.model";
import {TodoListService} from "../common/todo-list.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  todos: Todo[];
  allChecked: boolean;

  constructor(private todoListService: TodoListService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.todoListService.onChange.subscribe(() => {
      this.updateList();
    });
    this.updateList();
    this.allChecked = false;
  }

  updateList() {
    this.todos = this.todoListService.getTodos();
    if (this.router.url === '/active') {
      console.log('need to show only active todos');
    }
    else if (this.router.url === '/completed') {
      console.log('need to show only completed todos');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  markAll() {

  }

}
