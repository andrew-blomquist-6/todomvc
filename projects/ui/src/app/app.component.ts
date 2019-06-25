import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from './common/todo.model';
import {TodoListService} from './common/todo-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';

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

  constructor(private todoListService: TodoListService, private router: Router) {}
  ngOnInit() {
    this.subscription = this.todoListService.onChange.subscribe(() => {
      this.updateTodos();
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.statusFilter = this.router.url.slice(1, this.router.url.length);
      }
    });
    this.updateTodos();
    this.saving = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToPage(page: string) {
    this.router.navigateByUrl(page);
  }

  updateTodos() {
    this.todos = this.todoListService.getTodos();
    this.remainingCount = this.todoListService.countRemainingTodos();
    this.completedCount = this.todos.length - this.remainingCount;
  }

  addTodo(form: NgForm) {
    const text = form.value.todoText;
    if(text.trim().length) {
      this.todoListService.addTodo(new Todo(false, text));
      form.reset();
    }
  }

  clearCompletedTodos() {
    this.todoListService.clearCompleted();
  }

}
