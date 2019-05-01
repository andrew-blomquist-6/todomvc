import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from './common/todo.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {State} from './common/reducers';
import {Store} from '@ngrx/store';
import {AddTodo, LoadTodoList, RemoveCompleted} from './common/actions/todo-list.actions';
import {selectTodoList} from './common/selectors/todo-list.selector';

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

  constructor(private router: Router,
              private store: Store<State>) {}

  ngOnInit() {
    this.subscription = this.store.select(selectTodoList).subscribe((list) => {
      this.todos = list;
      this.remainingCount = this.countRemainingTodos();
      this.completedCount = this.todos.length - this.remainingCount;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.statusFilter = this.router.url.slice(1, this.router.url.length);
      }
    });
    this.store.dispatch(new LoadTodoList());
    this.saving = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      const newTodo = new Todo(false, text);
      this.store.dispatch(new AddTodo(newTodo));
      form.reset();
    }
  }

  clearCompletedTodos() {
    this.store.dispatch(new RemoveCompleted());
  }

}
