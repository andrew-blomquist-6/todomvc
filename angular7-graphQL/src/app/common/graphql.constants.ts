import gql from 'graphql-tag';

const GET_TODO_LIST = gql`
  query {
    getTodoList {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation CreateTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String, $completed: Boolean) {
    updateTodo(payload: {id: $id, title: $title, completed: $completed}) {
      id
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      completed
    }
  }
`;

export {GET_TODO_LIST, ADD_TODO, UPDATE_TODO, DELETE_TODO};
