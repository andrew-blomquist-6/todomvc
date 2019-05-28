
import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Todo} from './todo.model';
import {Apollo} from 'apollo-angular';
import {Subscription} from 'rxjs';
import {ADD_TODO, GET_TODO_LIST} from './graphql.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoListService implements OnDestroy {

  public onChange: EventEmitter<any>;
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
    }).subscribe(({data}) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the mutation', error);
    });
  }

  setEditingTodo(todo: Todo) {
    this.editingTodo = todo;
  }

  getEditingTodo() {
    return this.editingTodo;
  }

  updateTodo(index: number, todo: Todo) {
    this.todos[index] = todo;
    this.onChange.emit();
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.onChange.emit();
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
    this.todos = this.todos.filter((todo) => {
      return !todo.completed;
    });
    this.onChange.emit();
  }
}
