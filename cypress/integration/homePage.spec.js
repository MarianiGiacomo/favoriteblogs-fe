import { 
	createUser
} from './testHelpers'

import { 
	user, baseUrl, logoutSelector, 
	loginUrl
} from '../fixtures'

describe('Signup', () => {
	beforeEach( () => {
		cy.callReset()
		cy.visit(baseUrl)
	})

	it('Signup page opens', () => {
		cy.contains('Signup').click()
		cy.contains('Sign up with a test user')
		cy.contains('The created user will be automatically removed within 24 hours')
	})

	it('Signup works', () => {
		cy.contains('Signup').click()
		cy.get('#name').type(user.name)
    cy.get('#username').type(user.username)
    cy.get('#password').type(user.password)
    cy.get('.signup-form button').click()
		cy.contains(`User with username ${user.username} created`)
		cy.get('.message button').click()
	})
})

describe('Login & logout', () => {
  beforeEach( () => {
		cy.callReset()
		createUser(user)
    cy.visit(baseUrl)
  })
	
	it('Homepage can be opened', () => {
    cy.contains('Favorite Blogs')
  })

  it('user can log in', () => {
    cy.contains('Login').click()
    cy.get('#username').type(user.username)
    cy.get('#password').type(user.password)
    cy.get('.login-form button').click()
    cy.contains(`${user.username} logged in`)
  })

	it('Logout', () => {
		cy.login(loginUrl, user.username, user.password)
		cy.logout(logoutSelector)
	})
})
