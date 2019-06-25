/// <reference types="cypress" />

const todoList = [];

export function addTodo(todo: string) {
  cy.get('.new-todo').type(`${todo}{enter}`);
  todoList.push(todo);
}

export function verifyTodoList() {
  todoList.forEach((todo, index) => {
    cy.get(`:nth-child(${index + 1}) > app-todo > .view > label`).should('contain', todo);
  });
}
