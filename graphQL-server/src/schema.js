
import {gql} from 'apollo-server';

const typeDefs = gql`
  type Todo {
    id: ID
    title: String
    completed: Boolean
  }
  
  type Query {
    getTodoList: [Todo]
  }
  
  input updatePayload {
    id: ID!
    title: String
    completed: Boolean
  }
  
  type Mutation {
    createTodo(title: String!): Todo
    updateTodo(payload: updatePayload!): Todo
    deleteTodo(id: ID!): [Todo]
  }
`;

export default typeDefs;