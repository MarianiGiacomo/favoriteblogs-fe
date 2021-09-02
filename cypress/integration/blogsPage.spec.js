import { 
	visitBlog 
} from './testHelpers'

import {
	loginUrl, user
} from '../fixtures'

function login() { 
	cy.login(loginUrl, user.username, user.password) 
}

// beforeEach( () => {
// 	cy.createUser(user)
// 	login()
// })

// afterEach(() => {
// 	cy.callReset()
// })

describe('Blogs', () => {
	const newBlog = {
		title: 'A blog by Cypress',
		author: 'Cypress test',
		url: 'http://cypress.com'
	}

	const newComment = 'nice blog cypress!'	

  it('Create a new blog', () => {
		cy.callReset()
		cy.createUser(user)
		login()
    cy.contains('New blog').click()
    cy.get('#title').type(newBlog.title)
    cy.get('#author').type(newBlog.author)
    cy.get('#url').type(newBlog.url)
    cy.contains('Save').click()
		cy.contains(`A new blog "${newBlog.title} by ${newBlog.author}" added`)
		cy.get('.message button').click()
    cy.contains(newBlog.title)
  })

  it('The blog page opens and shows blog info', () => {
		visitBlog(newBlog)
    cy.contains(newBlog.title)
    cy.contains(newBlog.author)
		cy.contains(newBlog.url)
  })

  it('Comments can be added', () => {		
		visitBlog(newBlog)
		cy.contains('Add comment').click()
    cy.get('#comment').type(newComment)
    cy.contains('Save').click()
    cy.contains(`A new comment "${newComment}" added`)
		cy.get('.message button').click()
		cy.contains(newComment)
    cy.contains(`by ${user.name}`)
  })

	it('Like blog', () => {
		visitBlog(newBlog)
		cy.get('button.like').click()
		cy.contains('Likes: 1')
		cy.callReset()
	})

})
