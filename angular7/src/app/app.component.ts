import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from './common/todo.model';
import {NgForm} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {State} from './common/reducers';
import {Store} from '@ngrx/store';
import {selectTodoList} from './common/selectors/todo-list.selector';
import {takeUntil} from 'rxjs/operators';
import {TodoListService} from './common/todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  todos: Todo[];
  saving: boolean;
  remainingCount: number;
  completedCount: number;
  statusFilter: string;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private todoListService: TodoListService,
              private router: Router,
              private store: Store<State>) {}

  ngOnInit() {
    this.todoListService.initList();
    this.subscription = this.store.select(selectTodoList)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((list) => {
        this.todos = list;
        this.remainingCount = this.countRemainingTodos();
        this.completedCount = this.todos.length - this.remainingCount;
    });
    this.router.events
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.statusFilter = this.router.url.slice(1, this.router.url.length);
        }
    });
    this.saving = false;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  goToPage(page: string) {
    this.router.navigateByUrl(page);
  }

  countRemainingTodos() {
    let counter = 0;
    for (const todo of this.todos) {
      if (!todo.completed) {
        counter++;
      }
    }
    return counter;
  }

  submitTodo(form: NgForm) {
    const text = form.value.todoText;
    if (text === null) {
      return;
    }
    if (text.trim().length) {
      this.todoListService.addTodo(new Todo(false, text, 0));
      form.reset();
    }
  }

  clearCompletedTodos() {
    this.todos.forEach(todo => {
      if (todo.completed) {
        this.todoListService.deleteTodo(todo);
      }
    });
  }

}
