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
    }
  }
`;

export {GET_TODO_LIST, ADD_TODO};
