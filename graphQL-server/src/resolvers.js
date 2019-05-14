
class Todo {
  constructor({title, completed}) {
    this.title = title;
    this.completed = completed;
  }
}

//we're just storing the todos in memory
const todoList = [];

const resolvers = {
  getTodoList: () => {
    return todoList;
  },
  createTodo: ({payload}) => {
    todoList.push(payload);
    return new Todo(payload);
  },
  updateTodo: ({index, payload}) => {
    todoList[index] = payload;
    return new Todo(payload);
  },
  deleteTodo: ({index}) => {
    todoList.splice(index, 1);
    return todoList;
  }
};

export default resolvers;