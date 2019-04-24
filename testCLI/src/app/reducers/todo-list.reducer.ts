import {Todo} from "../common/todo.model";
import {TodoListActions, TodoListActionTypes} from "../actions/todo-list.actions";


export interface TodoListState {
  todoList: Array<Todo>,
  editingTodo: Todo
}

export const initialState: TodoListState = {
  todoList: [],
  editingTodo: null
};

export function todoListReducer(state = initialState, action: TodoListActions): TodoListState {
  switch (action.type) {
    case TodoListActionTypes.LoadTodoList:
      return {...state, todoList: action.todoList};
    case TodoListActionTypes.AddTodo:
      return {...state, todoList: [...state.todoList, action.todo]};
    case TodoListActionTypes.UpdateTodo:
      //TODO: should this be done differently? Pointers are sneaky... defeating the purpose of states?
      let newList = state.todoList;
      newList[action.index] = action.todo;
      return {...state, todoList: newList};
    case TodoListActionTypes.RemoveTodo:
      return {...state, todoList: state.todoList.splice(action.index, 1)};
    case TodoListActionTypes.RemoveCompleted:
      return {...state, todoList: state.todoList.filter((todo) => {
        return !todo.completed;
        })
      };
    case TodoListActionTypes.UpdateEditingTodo:
      return {...state, editingTodo: action.todo};
    default:
      return state;
  }
}
