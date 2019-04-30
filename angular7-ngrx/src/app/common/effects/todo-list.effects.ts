import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {SaveToLocalStorage, TodoListActionTypes} from "../actions/todo-list.actions";
import {mapTo} from "rxjs/operators";

@Injectable()
export class TodoListEffects {

  constructor(private actions$: Actions) {}

  @Effect()
  public saveToLocalStorage$: Observable<Action> =
    this.actions$.pipe(
      ofType(
        TodoListActionTypes.AddTodo,
        TodoListActionTypes.UpdateTodo,
        TodoListActionTypes.RemoveTodo,
        TodoListActionTypes.RemoveCompleted
      ),
      mapTo(new SaveToLocalStorage())
    );
}
