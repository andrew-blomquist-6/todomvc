/// <reference types="cypress" />

import {addTodo, verifyTodoList} from '../support/app.po';

describe('The TODO List', () => {

  before(() => {
    cy.visit('');
  });

  it('should let you add a todo', () => {
    const todo = 'here is the first todo';
    addTodo(todo);
    verifyTodoList();
  });

  it('should add a new todo to the end of the list', () => {
    const todo = 'the second todo in the list';
    addTodo(todo);
    verifyTodoList();
  });

  it( 'should preserve the order todos were added to the list', () => {
    const todo = 'the third todo in the list';
    addTodo(todo);
    verifyTodoList();
  });
});
