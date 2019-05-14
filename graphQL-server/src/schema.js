
import {buildSchema} from 'graphql';

const schema = buildSchema(`
  type Todo {
    title: String
    completed: Boolean
  }
  
  type Query {
    getTodoList: [Todo]
  }
  
  input TodoInput {
    title: String
    completed: Boolean
  }
  
  type Mutation {
    createTodo(payload: TodoInput!): Todo
    updateTodo(index: ID!, payload: TodoInput!): Todo
    deleteTodo(index: ID!): [Todo]
  }
`);

export default schema;