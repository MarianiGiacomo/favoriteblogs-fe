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
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { resetAPI, userAPI } from '../fixtures'

Cypress.Commands.add('createUser', (user) => {
	cy.request('POST', userAPI, user)
})

Cypress.Commands.add('login', (url, username, password) => {
	cy.visit(url)
	cy.get('#username').type(username)
	cy.get('#password').type(password)
	cy.get('.login-form button').click()
})

Cypress.Commands.add('logout', (buttonSelector) => {
	cy.get(buttonSelector).click()
})

Cypress.Commands.add('callReset', () => {
	cy.request('POST', resetAPI)
})