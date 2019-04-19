import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "./common/todo.model";
import {TodoListService} from "./common/todo-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  todos: Todo[];
  newTodo: string;
  saving: boolean;
  remainingCount: number;
  completedCount: number;
  statusFilter: string;

  constructor(private todoListService: TodoListService) {}
  ngOnInit() {
    this.subscription = this.todoListService.onChange.subscribe(() => {
      this.todos = this.todoListService.getTodos();
      this.remainingCount = this.todoListService.countRemainingTodos();
      this.completedCount = this.todos.length - this.remainingCount;
    });
    this.todos = this.todoListService.getTodos();
    this.saving = false;
    //TODO: have routing change this
    this.statusFilter = '';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTodo(form: NgForm) {
    this.todoListService.addTodo(new Todo(false, form.value.todoText));
    form.reset();
  }

  clearCompletedTodos() {
    this.todoListService.clearCompleted();
  }

}
