/// <reference types="cypress" />

import {addTodo, removeTodo, resetTodoTracker, toggleTodo, verifyTodoList} from '../support/app.po';

const todos = [
  'here is the first todo',
  'the second todo in the list',
  'the third todo in the list',
  'number 4',
  'and then there were five'
];

describe('The TODO List', () => {

  describe('Basic Functionality', () => {
    beforeEach(() => {
      // we don't want tests to be dependent on a previous test passing
      resetTodoTracker();
      cy.visit('');
    });

    it('should let you add a todo', () => {
      addTodo(todos[0]);
      verifyTodoList();
    });

    it('should add a new todo to the end of the list', () => {
      addTodo(todos[1]);
      addTodo(todos[0]);
      verifyTodoList();
    });

    it( 'should preserve the order todos were added to the list', () => {
      addTodo(todos[2]);
      addTodo(todos[0]);
      addTodo(todos[4]);
      verifyTodoList();
    });
  });

  describe('Todo Controls', () => {
    beforeEach(() => {
      // we don't want tests to be dependent on a previous test passing
      resetTodoTracker();
      cy.visit('');
      addTodo(todos[2]);
      addTodo(todos[4]);
      addTodo(todos[1]);
      addTodo(todos[3]);
    });

    it('should remove the todo when you click on its remove button', () => {
      removeTodo(todos[1]);
      verifyTodoList();
    });

    it('should mark the todo completed when the user clicks the checkbox', () => {
      toggleTodo(todos[2]);
      verifyTodoList();
    });

    it('should show how many todos are incomplete', () => {
      cy.get('.footer > .todo-count').should('contain', '4 items left');
      toggleTodo(todos[2]);
      verifyTodoList();
      cy.get('.footer > .todo-count').should('contain', '3 items left');
      toggleTodo(todos[2]);
      toggleTodo(todos[4]);
      verifyTodoList();
      cy.get('.footer > .todo-count').should('contain', '3 items left');
      removeTodo(todos[2]);
      removeTodo(todos[3]);
      verifyTodoList();
      cy.get('.footer > .todo-count').should('contain', '1 item left');
    });

    // this test exposes a bug I had forgotten about (and didn't bother fixing)
    it('should toggle all todos when the toggle all switch is clicked', () => {
      cy.get(`:nth-child(1) > app-todo > .view > .toggle`).should('have.value', 'false');
      cy.get(`:nth-child(2) > app-todo > .view > .toggle`).should('have.value', 'false');
      cy.get(`:nth-child(3) > app-todo > .view > .toggle`).should('have.value', 'false');
      cy.get(`:nth-child(4) > app-todo > .view > .toggle`).should('have.value', 'false');
      cy.get('.toggle-all').click();
      cy.get(`:nth-child(1) > app-todo > .view > .toggle`).should('have.value', 'true');
      cy.get(`:nth-child(2) > app-todo > .view > .toggle`).should('have.value', 'true');
      cy.get(`:nth-child(3) > app-todo > .view > .toggle`).should('have.value', 'true');
      cy.get(`:nth-child(4) > app-todo > .view > .toggle`).should('have.value', 'true');
      cy.get('.toggle-all').click();
      cy.get(`:nth-child(1) > app-todo > .view > .toggle`).should('have.value', 'false');
      cy.get(`:nth-child(2) > app-todo > .view > .toggle`).should('have.value', 'false');
      cy.get(`:nth-child(3) > app-todo > .view > .toggle`).should('have.value', 'false');
      cy.get(`:nth-child(4) > app-todo > .view > .toggle`).should('have.value', 'false');
    });

    it('should remove all completed todos when \'Clear completed\' is clicked', () => {
      toggleTodo(todos[2]);
      verifyTodoList();
      cy.get('.clear-completed').click();
      removeTodo(todos[2], false);
      verifyTodoList();
      toggleTodo(todos[4]);
      toggleTodo(todos[3]);
      cy.get('.clear-completed').click();
      removeTodo(todos[4], false);
      removeTodo(todos[3], false);
      verifyTodoList();
    });
  });

  describe('Filters', () => {
    beforeEach(() => {
      resetTodoTracker();
      cy.visit('');
      addTodo(todos[2]);
      addTodo(todos[4]);
      addTodo(todos[1]);
      addTodo(todos[3]);
    });

    it('should show all todos when \'All\' is selected', () => {
      cy.get('app-todo-list').find('app-todo').should('have.length', 4);
      toggleTodo(todos[2]);
      toggleTodo(todos[3]);
      cy.get('app-todo-list').find('app-todo').should('have.length', 4);
    });

    it('should show only incomplete todos when the user clicks \'Active\'', () => {
      cy.get('.footer > .filters > li > a').eq(1).click();
      cy.get('app-todo-list').find('app-todo').should('have.length', 4);
      toggleTodo(todos[2]);
      cy.get('app-todo-list').find('app-todo').should('have.length', 3);
    });

    it('should show only complete todos when the user clicks\'Completed\'', () => {
      cy.get('.footer > .filters > li > a').eq(2).click();
      cy.get('app-todo-list').find('app-todo').should('have.length', 0);
      cy.get('.footer > .filters > li > a').eq(0).click();
      toggleTodo(todos[4]);
      cy.get('.footer > .filters > li > a').eq(2).click();
      cy.get('app-todo-list').find('app-todo').should('have.length', 1);
      cy.get(`:nth-child(1) > app-todo > .view > .toggle`).click();
      cy.get('app-todo-list').find('app-todo').should('have.length', 0);
    });

    it('should modify the URL when switching between filters', () => {
      cy.url().should('not.include', '/completed');
      cy.url().should('not.include', '/active');
      cy.get('.footer > .filters > li > a').eq(1).click();
      cy.url().should('not.include', '/completed');
      cy.url().should('include', '/active');
      cy.get('.footer > .filters > li > a').eq(2).click();
      cy.url().should('include', '/completed');
      cy.url().should('not.include', '/active');
    });

  });
});
