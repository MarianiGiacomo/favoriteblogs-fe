const user = {
  name: 'Test User',
  username: 'testuser',
  password: 'password'
}

const baseUrl = 'http://localhost:3000'
const apiUrl = 'http://localhost:3001'
const blogsPath = '/'
const usersPath = '/users'
const loginUrl = `${baseUrl}/login`
const resetAPI = `${apiUrl}/api/testing/reset`
const userAPI = `${apiUrl}/api/users`

function reset(){
	cy.request('POST', resetAPI)
}

function createUser(user){
	cy.request('POST', userAPI, user)
}

function login(user){
	cy.visit(loginUrl)
	cy.get('#username')
		.type(user.username)
	cy.get('#password')
		.type(user.password)
	cy.get('.login-form button')
		.click()
}

function visitBlog(blog) {
	cy.get(`nav [href="${blogsPath}"]`).click()
	cy.contains(blog.title).click()
}

function logout(){
	if(document.querySelector('button.logout')){
		cy.contains('Logout').click()
	}
}

describe('Signup', () => {
	beforeEach( () => {
		reset()
		cy.visit(baseUrl)
	})

	afterEach(() => {
		logout()
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

describe('Login', () => {
  beforeEach( () => {
		reset()
		createUser(user)
    cy.visit(baseUrl)
  })
	
	afterEach(() => {
		logout()
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
})

describe('New blog', () => {
	const newBlog = {
		title: 'A blog by Cypress',
		author: 'Cypress test',
		url: 'http://cypress.com'
	}

	const newComment = 'nice blog cypress!'

  beforeEach( () => {
		login(user)
  })

	afterEach(() => {
		logout()
	})

  it('A new blog can be created', () => {
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
    // cy.contains(newBlog.title).click()
		visitBlog(newBlog)
    cy.contains(newBlog.title)
    cy.contains(newBlog.author)
		cy.contains(newBlog.url)
  })

  it('Comments can be added', function() {		
    cy.contains(newBlog.title).click()
    cy.contains('Add comment').click()
    cy.get('#comment').type(newComment)
    cy.contains('Save').click()
    cy.contains(`A new comment "${newComment}" added`)
		cy.get('.message button').click()
		cy.contains(newComment)
    cy.contains(`by ${user.name}`)
  })

})