/// <reference types="cypress" />

import {Todo} from '../../../ui/src/app/common/todo.model';

let todoList: Todo[] = [];

export function resetTodoTracker() {
  todoList = [];
}

export function addTodo(todo: string) {
  cy.get('.new-todo').type(`${todo}{enter}`);
  todoList.push(new Todo(false, todo));
}

export function removeTodo(todo: string, handleDOM: boolean = true) {
  const index = todoList.findIndex(i => i.title === todo);
  if (handleDOM) {
    cy.get(`:nth-child(${index + 1}) > app-todo > .view > .destroy`)
      .invoke('show')
      .click();
  }
  todoList.splice(index, 1);
}

export function toggleTodo(todo: string) {
  const index = todoList.findIndex(i => i.title === todo);
  cy.get(`:nth-child(${index + 1}) > app-todo > .view > .toggle`).click();
  const obj = todoList[index];
  todoList[index] = new Todo(!obj.completed, todo);
}

// this function expects no filter to be applied to the list
export function verifyTodoList() {
  cy.get('app-todo-list').find('app-todo').should('have.length', todoList.length);
  todoList.forEach((todo, index) => {
    cy.get(`:nth-child(${index + 1}) > app-todo > .view > label`).should('contain', todo.title);
    if (todo.completed) {
      verifyTodoIsCompleted(index);
    } else {
      verifyTodoIsPending(index);
    }
  });
}

export function verifyTodoIsCompleted(index: number) {
  cy.get(`:nth-child(${index + 1}) > app-todo > .view > .toggle`).should('have.value', 'true');
  cy.get('.todo-list').children(`:nth-child(${index + 1})`).should('have.class', 'completed');
}

export function verifyTodoIsPending(index: number) {
  cy.get(`:nth-child(${index + 1}) > app-todo > .view > .toggle`).should('have.value', 'false');
  cy.get('.todo-list').children(`:nth-child(${index + 1})`).should('not.have.class', 'completed');
}
