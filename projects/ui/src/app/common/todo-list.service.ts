import {Injectable, OnDestroy} from '@angular/core';
import {Todo} from './todo.model';
import {Apollo} from 'apollo-angular';
import {Subscription} from 'rxjs';
import {ADD_TODO, DELETE_TODO, GET_TODO_LIST, UPDATE_TODO} from './graphql.constants';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {State} from './reducers';
import {LoadTodoList} from './actions/todo-list.actions';

@Injectable({
  providedIn: 'root'
})
export class TodoListService implements OnDestroy {

  private querySubscription: Subscription;

  constructor(private apollo: Apollo,
              private store: Store<State>) { }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  initList() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_TODO_LIST
    })
      .valueChanges
      .pipe(take(1))
      .subscribe(({data}) => {
        this.store.dispatch(new LoadTodoList(data.getTodoList));
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
        this.store.dispatch(new LoadTodoList(data.addTodo));
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
        this.store.dispatch(new LoadTodoList(data.updateTodo));
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
        this.store.dispatch(new LoadTodoList(data.deleteTodo));
    }, this.requestError);
  }

  requestError = (error) => {
    console.log('there was an error sending the mutation', error);
  }
}
