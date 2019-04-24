import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {todoListReducer, TodoListState} from "./todo-list.reducer";

export interface State {
  todoList: TodoListState
}

export const reducers: ActionReducerMap<State> = {
  todoList: todoListReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
