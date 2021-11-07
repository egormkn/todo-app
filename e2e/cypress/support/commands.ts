/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************

import 'cypress-localstorage-commands';

// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getLocalStorage', (key) => {
  cy.window().then((window) => window.localStorage.getItem(key));
});

Cypress.Commands.add('setSessionStorage', (key, value) => {
  cy.window().then((window) => window.sessionStorage.setItem(key, value));
});

Cypress.Commands.add('signUp', (signUpDto: SignUpDto, failOnStatusCode = true) => {
  return cy
    .request({
      method: 'POST',
      url: `/api/auth/signup`,
      body: { ...signUpDto },
      failOnStatusCode,
    })
    .its('body');
});

Cypress.Commands.add('logIn', (logInDto: LogInDto, failOnStatusCode = true) => {
  return cy
    .request({
      method: 'POST',
      url: `/api/auth/login`,
      body: { ...logInDto },
      failOnStatusCode,
    })
    .its('body');
});

type ErrorResponse = {
  error: string;
};

type TokenResponse = {
  access_token: string;
};

Cypress.Commands.add('authenticate', (signUpDto: SignUpDto) => {
  const { username, password } = signUpDto;
  return cy.logIn({ username, password }, false).then((body: TokenResponse | ErrorResponse) => {
    return 'access_token' in body
      ? body
      : cy
          .request({
            method: 'POST',
            url: `/api/auth/signup`,
            body: { ...signUpDto },
            failOnStatusCode: true,
          })
          .its('body');
  });
});
