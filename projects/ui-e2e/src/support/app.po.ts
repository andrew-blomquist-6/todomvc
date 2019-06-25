/// <reference types="cypress" />

import {Todo} from '../../../ui/src/app/common/todo.model';

const todoList: Todo[] = [];

export function addTodo(todo: string) {
  cy.get('.new-todo').type(`${todo}{enter}`);
  todoList.push(new Todo(false, todo));
}

export function removeTodo(todo: string) {
  const index = todoList.findIndex(i => i.title === todo);
  cy.get(`:nth-child(${index + 1}) > app-todo > .view > .destroy`)
    .invoke('show')
    .click();
  todoList.splice(index, 1);
}

export function toggleTodo(todo: string) {
  const index = todoList.findIndex(i => i.title === todo);
  cy.get(`:nth-child(${index + 1}) > app-todo > .view > .toggle`).click();
  const obj = todoList[index];
  todoList[index] = new Todo(!obj.completed, todo);
}

export function verifyTodoList() {
  todoList.forEach((todo, index) => {
    cy.get(`:nth-child(${index + 1}) > app-todo > .view > label`).should('contain', todo.title);
    cy.get(`:nth-child(${index + 1}) > app-todo > .view > .toggle`).should('have.value', todo.completed.toString());
  });
}
