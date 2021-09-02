import { 
	userAPI, blogsPath 
} from '../fixtures'

export function createUser(user){
	cy.request('POST', userAPI, user)
}

export function visitBlog(blog) {
	clickNavLink(blogsPath)
	cy.contains(blog.title).click()
}

export function clickNavLink(path) {
	cy.get(`nav [href="${path}"]`).click()
}

