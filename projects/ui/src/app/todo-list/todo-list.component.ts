import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../common/todo.model';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../common/reducers';
import {selectEditingTodo, selectTodoList} from '../common/selectors/todo-list.selector';
import {take, takeUntil} from 'rxjs/operators';
import {UpdateTodo} from '../common/actions/todo-list.actions';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject<void>();

  todos: Todo[];
  editingTodo: Todo;
  allChecked = false;

  constructor(private router: Router,
              private store: Store<State>) {}

  ngOnInit() {
    this.store.select(selectEditingTodo)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((todo) => {
        this.editingTodo = todo;
    });
    this.store.select(selectTodoList)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((list) => {
        this.todos = list;
        this.updateList();
    });
    // angular should take care of un-subscribing from this one
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.store.select(selectTodoList)
          .pipe(take(1))
          .subscribe((list) => {
            this.todos = list;
            this.updateList();
          });
      }
    });
  }

  updateList() {
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
    // TODO: why next() and then complete()?
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  isEditingTodo(todo: Todo) {
    return todo === this.editingTodo;
  }

  // Tried to use Ng-Model for this, but the first click didn't work as expected
  markAll() {
    this.allChecked = !this.allChecked;
    this.todos.forEach((todo, index) => {
      todo.completed = this.allChecked;
      this.store.dispatch(new UpdateTodo(todo, index));
    });
  }

}
