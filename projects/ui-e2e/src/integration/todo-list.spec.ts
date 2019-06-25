/// <reference types="cypress" />

import {addTodo, removeTodo, toggleTodo, verifyTodoList} from '../support/app.po';

describe('The TODO List', () => {

  before(() => {
    cy.visit('');
  });

  it('should let you add a todo', () => {
    addTodo('here is the first todo');
    verifyTodoList();
  });

  it('should add a new todo to the end of the list', () => {
    addTodo('the second todo in the list');
    verifyTodoList();
  });

  it( 'should preserve the order todos were added to the list', () => {
    addTodo('the third todo in the list');
    addTodo('number 4');
    addTodo('and then there were five');
    verifyTodoList();
  });

  it('should remove the todo when you click on its remove button', () => {
    removeTodo('the second todo in the list');
    verifyTodoList();
  });

  it('should mark the todo completed when the user clicks the checkbox', () => {
    toggleTodo('the third todo in the list');
    verifyTodoList();
  });

  it('should show how many todos are incomplete', () => {
    cy.get('.footer > .todo-count').should('contain', '3 items left');
    toggleTodo('the third todo in the list');
    verifyTodoList();
    cy.get('.footer > .todo-count').should('contain', '4 items left');
    toggleTodo('the third todo in the list');
    toggleTodo('and then there were five');
    verifyTodoList();
    cy.get('.footer > .todo-count').should('contain', '2 items left');
    removeTodo('the third todo in the list');
    removeTodo('number 4');
    verifyTodoList();
    cy.get('.footer > .todo-count').should('contain', '1 item left');
  });

  it('should show only incomplete todos when the user clicks \'Active\'', () => {});

  it('should show only complete todos when the user clicks\'Completed\'', () => {});

  it('should toggle all todos when the toggle all switch is clicked', () => {});

  it('should remove all completed todos when \'Clear completed\' is clicked', () => {});
});
