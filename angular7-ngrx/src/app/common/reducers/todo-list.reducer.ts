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
      let temp = JSON.parse(localStorage.getItem(state.storageKey));
      if (temp === null) {
        temp = [];
      }
      return {
        ...state,
        list: temp
      };
    case TodoListActionTypes.AddTodo:
      return {
        ...state,
        list: [...state.list, action.todo]
      };
    case TodoListActionTypes.UpdateTodo:
      const newList = state.list.slice();
      newList[action.index] = action.todo;
      return {
        ...state,
        list: newList
      };
    case TodoListActionTypes.RemoveTodo:
      return {
        ...state,
        list: state.list.splice(action.index, 1)
      };
    case TodoListActionTypes.RemoveCompleted:
      return {
        ...state,
        list: state.list.filter((todo) => {
          return !todo.completed;
        })
      };
    case TodoListActionTypes.UpdateEditingTodo:
      return {
        ...state,
        editingTodo: action.todo
      };
    case TodoListActionTypes.SaveToLocalStorage:
      localStorage.setItem(state.storageKey, JSON.stringify(state.list));
      return state;
    default:
      return state;
  }
}
