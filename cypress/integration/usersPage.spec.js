import { 
	clickNavLink, 
	createUser
} 
from './testHelpers'

import { 
	user, newUser, usersPath, 
	loginUrl
} from '../fixtures'

function login() { 
	cy.login(loginUrl, user.username, user.password) 
}

describe('Users', () => {
  beforeEach( () => {
		cy.callReset()
		createUser(user)
    login()
  })
	
	it('Display users', () => {
		createUser(newUser)
		clickNavLink(usersPath)
		cy.contains('Users')
	})
})