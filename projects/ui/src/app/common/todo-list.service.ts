
import {Apollo} from 'apollo-angular';
import {Subscription} from 'rxjs';
import {ADD_TODO, DELETE_TODO, GET_TODO_LIST, UPDATE_TODO} from './graphql.constants';
import {take} from 'rxjs/operators';
import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Todo} from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService implements OnDestroy {

  public onChange: EventEmitter<any>;
  // change this boolean if you don't want to use local storage
  private useLocalStorage = false;
  private storageID = 'todos-angular';
  private todos: Todo[];
  private editingTodo: Todo;
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {
    this.todos = [];
    this.onChange = new EventEmitter<any>();
    this.editingTodo = null;

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_TODO_LIST
    }).valueChanges.subscribe(({data}) => {
      this.todos = data.getTodoList;
      this.onChange.emit();
    });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  getTodos() {
    return this.todos.slice();
  }

  getTodo(index: number) {
    return this.todos[index];
  }

  addTodo(todo: Todo) {
    this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        title: todo.title
      }
    }).pipe(take(1))
      .subscribe(({data}) => {
      this.todos = data.createTodo;
      this.onChange.emit();
    }, this.requestError);
  }

  setEditingTodo(todo: Todo) {
    this.editingTodo = todo;
  }

  getEditingTodo() {
    return this.editingTodo;
  }

  updateTodo(todo: Todo) {
    this.apollo.mutate({
      mutation: UPDATE_TODO,
      variables: {
        id: todo.id,
        title: todo.title,
        completed: todo.completed
      }
    }).pipe(take(1))
      .subscribe(({data}) => {
      this.todos = data.updateTodo;
      this.onChange.emit();
    }, this.requestError);
  }

  deleteTodo(todo: Todo) {
    this.apollo.mutate({
      mutation: DELETE_TODO,
      variables: {
        id: todo.id
      }
    }).pipe(take(1))
      .subscribe(({data}) => {
      this.todos = data.deleteTodo;
      this.onChange.emit();
    }, this.requestError);
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

  clearCompleted() {
    this.todos.forEach(todo => {
      if (todo.completed) {
        this.deleteTodo(todo);
      }
    });
  }

  requestError = (error) => {
    console.log('there was an error sending the mutation', error);
  }
}
