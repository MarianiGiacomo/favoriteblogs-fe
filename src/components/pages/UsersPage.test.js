/**
 * @jest-environment jsdom
 */
import React from 'react'
import {  BrowserRouter as Router } from "react-router-dom"

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import { Provider } from 'react-redux'

import UsersPage from 'src/components/pages/UsersPage'

import { blogs, comments, users, getStore } from 'src/lib/testHelpers'
import { populateWithBlogs } from 'src/lib'

describe('<UsersPage/>', () => {
	let component;
	beforeEach( () => {
		component = render(
			<Router>
				<Provider store={getStore(blogs, users[0], comments, users)}>
					<UsersPage />
				</Provider>
			</Router>
		)
	})
	afterEach(cleanup)

  test('Renders the user\'s name with link and blogs count', () => {
		const populatedUsers = populateWithBlogs(users, blogs)
		populatedUsers.forEach( (u, i) => {
			const link = component.container.querySelector(`a[href="/users/${u.id}"]`)
			const blogsCounts = component.container.querySelectorAll(`td:nth-child(2)`)
			expect(link).not.toBeNull()
			expect(link).toHaveTextContent(u.name)
			expect(blogsCounts[i]).toHaveTextContent(u.blogs.length)
		})
	})
})

