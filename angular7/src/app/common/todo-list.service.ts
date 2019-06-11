
import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Todo} from './todo.model';
import {Apollo} from 'apollo-angular';
import {Subscription} from 'rxjs';
import {ADD_TODO, DELETE_TODO, GET_TODO_LIST, UPDATE_TODO} from './graphql.constants';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoListService implements OnDestroy {

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  initList() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_TODO_LIST
    }).valueChanges.subscribe(({data}) => {
      // TODO: update the redux store
    });
  }

  addTodo(todo: Todo) {
    this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        title: todo.title
      }
    }).pipe(take(1))
      .subscribe(({data}) => {
        // TODO: update the redux store
    }, this.requestError);
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
        // TODO: update the redux store
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
        // TODO: update the redux store
    }, this.requestError);
  }

  requestError = (error) => {
    console.log('there was an error sending the mutation', error);
  }
}
