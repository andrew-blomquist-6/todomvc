import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../common/todo.model';
import {TodoListService} from '../common/todo-list.service';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  todos: Todo[];
  allChecked = false;

  constructor(private todoListService: TodoListService, private router: Router) {
    this.subscription = this.todoListService.onChange.subscribe(() => {
      this.updateList();
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateList();
      }
    });
  }

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.todos = this.todoListService.getTodos();
    if (this.router.url === '/active') {
      this.todos = this.todos.filter((todo) => {
        return !todo.completed;
      });
    } else if (this.router.url === '/completed') {
      this.todos = this.todos.filter((todo) => {
        return todo.completed;
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isEditingTodo(todo: Todo) {
    return todo === this.todoListService.getEditingTodo();
  }

  // Tried to use Ng-Model for this, but the first click didn't work as expected
  markAll() {
    this.allChecked = !this.allChecked;
    this.todos.forEach((todo, index) => {
      todo.completed = this.allChecked;
      this.todoListService.updateTodo(index, todo);
    });
  }

}
