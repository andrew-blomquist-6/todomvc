import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "./common/todo.model";
import {TodoListService} from "./common/todo-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {State} from "./reducers";
import {Store} from "@ngrx/store";
import {AddTodo, LoadTodoList, RemoveCompleted} from "./actions/todo-list.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  ngrxSubscription: Subscription;
  todos: Todo[];
  newTodo: string;
  saving: boolean;
  remainingCount: number;
  completedCount: number;
  statusFilter: string;
  private loadFromStorage = true;
  private storageID = "todos-angular-ngrx";

  constructor(private todoListService: TodoListService,
              private router: Router,
              private store: Store<State>) {}

  ngOnInit() {
    // this.subscription = this.todoListService.onChange.subscribe(() => {
    //   this.updateTodos();
    // });
    this.ngrxSubscription = this.store.select((state) => state.todoList).subscribe((state) => {
      this.todos = state.todoList;
      this.remainingCount = this.countRemainingTodos();
      this.completedCount = this.todos.length - this.remainingCount;
    });
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.statusFilter = this.router.url.slice(1, this.router.url.length);
      }
    });
    if(this.loadFromStorage) {
      let tempList = JSON.parse(localStorage.getItem(this.storageID));
      if(tempList === null) {
        tempList = [];
      }
      this.store.dispatch(new LoadTodoList(tempList));
    }
    this.saving = false;
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
    this.ngrxSubscription.unsubscribe();
  }

  countRemainingTodos() {
    let counter = 0;
    for (let todo of this.todos) {
      if(!todo.completed) {
        counter++;
      }
    }
    return counter;
  }

  // updateTodos() {
  //   this.todos = this.todoListService.getTodos();
  //   this.remainingCount = this.todoListService.countRemainingTodos();
  //   this.completedCount = this.todos.length - this.remainingCount;
  // }

  submitTodo(form: NgForm) {
    const text = form.value.todoText;
    if(text.trim().length) {
      const newTodo = new Todo(false, text);
      //this.todoListService.addTodo(newTodo);
      this.store.dispatch(new AddTodo(newTodo));
      form.reset();
    }
  }

  clearCompletedTodos() {
    //this.todoListService.clearCompleted();
    this.store.dispatch(new RemoveCompleted());
  }

}
