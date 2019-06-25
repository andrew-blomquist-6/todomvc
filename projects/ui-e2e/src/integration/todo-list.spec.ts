/// <reference types="cypress" />

import {addTodo, removeTodo, toggleTodo, verifyTodoList} from '../support/app.po';

const todos = [
  'here is the first todo',
  'the second todo in the list',
  'the third todo in the list',
  'number 4',
  'and then there were five'
];

describe('The TODO List', () => {

  before(() => {
    cy.visit('');
  });

  it('should let you add a todo', () => {
    addTodo(todos[0]);
    verifyTodoList();
  });

  it('should add a new todo to the end of the list', () => {
    addTodo(todos[1]);
    verifyTodoList();
  });

  it( 'should preserve the order todos were added to the list', () => {
    addTodo(todos[2]);
    addTodo(todos[3]);
    addTodo(todos[4]);
    verifyTodoList();
  });

  describe('Todo Controls', () => {
    it('should remove the todo when you click on its remove button', () => {
      removeTodo(todos[1]);
      verifyTodoList();
    });

    it('should mark the todo completed when the user clicks the checkbox', () => {
      toggleTodo(todos[2]);
      verifyTodoList();
    });

    it('should show how many todos are incomplete', () => {
      cy.get('.footer > .todo-count').should('contain', '3 items left');
      toggleTodo(todos[2]);
      verifyTodoList();
      cy.get('.footer > .todo-count').should('contain', '4 items left');
      toggleTodo(todos[2]);
      toggleTodo(todos[4]);
      verifyTodoList();
      cy.get('.footer > .todo-count').should('contain', '2 items left');
      removeTodo(todos[2]);
      removeTodo(todos[3]);
      verifyTodoList();
      cy.get('.footer > .todo-count').should('contain', '1 item left');
    });


    it('should toggle all todos when the toggle all switch is clicked', () => {});

    it('should remove all completed todos when \'Clear completed\' is clicked', () => {});
  });

  describe('Filters', () => {
    // make sure 'All' filter is selected
    beforeEach(() => {
      cy.get('.footer > .filters > li > a').eq(0).click();
    });

    after(() => {
      cy.get('.footer > .filters > li > a').eq(0).click();
    })

    it('should show only incomplete todos when the user clicks \'Active\'', () => {
      cy.get('.footer > .filters > li > a').eq(1).click();
      cy.get('app-todo-list').find('app-todo').should('have.length', 1);
      toggleTodo(todos[0]);
      cy.get('app-todo-list').find('app-todo').should('have.length', 0);
    });

    it('should show only complete todos when the user clicks\'Completed\'', () => {
      cy.get('.footer > .filters > li > a').eq(2).click();
      cy.get('app-todo-list').find('app-todo').should('have.length', 2);
      toggleTodo(todos[4]);
      cy.get('app-todo-list').find('app-todo').should('have.length', 1);
      toggleTodo(todos[0]);
      cy.get('app-todo-list').find('app-todo').should('have.length', 0);
    });

  });
});
