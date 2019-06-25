import {Todo} from '../todo.model';
import {TodoListActions, TodoListActionTypes} from '../actions/todo-list.actions';

export interface TodoListState {
  list: Array<Todo>;
  editingTodo: Todo;
  storageKey: string;
}

export const initialState: TodoListState = {
  list: [],
  editingTodo: null,
  storageKey: 'todos-angular-ngrx'
};

export function todoListReducer(state = initialState, action: TodoListActions): TodoListState {
  switch (action.type) {
    case TodoListActionTypes.LoadTodoList:
      return applyLoadTodoList(state, action);
    case TodoListActionTypes.AddTodo:
      return applyAddTodo(state, action);
    case TodoListActionTypes.UpdateTodo:
      return applyUpdateTodo(state, action);
    case TodoListActionTypes.RemoveTodo:
      return applyRemoveTodo(state, action);
    case TodoListActionTypes.RemoveCompleted:
      return applyRemoveCompleted(state, action);
    case TodoListActionTypes.UpdateEditingTodo:
      return applyUpdateEditingTodo(state, action);
    default:
      return state;
  }
}

function applyLoadTodoList(state, action) {
  return {
    ...state,
    list: action.list
  };
}

function applyAddTodo(state, action) {
  return {
    ...state,
    list: [...state.list, action.todo]
  };
}

function applyUpdateTodo(state, action) {
  const newList = state.list.slice();
  newList[action.index] = action.todo;
  return {
    ...state,
    list: newList
  };
}

function applyRemoveTodo(state, action) {
  state.list.splice(action.index, 1);
  return {
    ...state,
    list: state.list
  };
}

function applyRemoveCompleted(state, action) {
  return {
    ...state,
    list: state.list.filter((todo) => {
      return !todo.completed;
    })
  };
}

function applyUpdateEditingTodo(state, action) {
  return {
    ...state,
    editingTodo: action.todo
  };
}
