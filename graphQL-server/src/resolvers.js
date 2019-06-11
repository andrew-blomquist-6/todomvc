
class Todo {
  constructor({id, title, completed}) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}

//we're just storing the todos in memory
let todoList = [];

const getUniqueID = () => {
  const id = Math.floor(Math.random().toFixed(5) * 100000);
  const index = todoList.find(item => item.id === id);
  if(index) {
    return getUniqueID();
  }
  return id;
};

//adding some default data
todoList.push(new Todo({id: getUniqueID(), title: 'fix all the problems', completed: false}));
todoList.push(new Todo({id: getUniqueID(), title: 'go on vacation', completed: false}));

const resolvers = {
  Query: {
    getTodoList: () => {
      return todoList;
    }
  },
  Mutation: {
    createTodo: (root, args) => {
      const todo = new Todo({id: getUniqueID(), title: args.title, completed: false});
      todoList.push(todo);
      return todoList;
    },
    updateTodo: (root, args) => {
      const index = todoList.findIndex(item => item.id === parseInt(args.payload.id));
      const todo = new Todo(args.payload);
      todoList.splice(index, 1, todo);
      return todoList;
    },
    deleteTodo: (root, args) => {
      todoList = todoList.filter(item => item.id !== parseInt(args.id));
      return todoList;
    }
  }
};

export default resolvers;
