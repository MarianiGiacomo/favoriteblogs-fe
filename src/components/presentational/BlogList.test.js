/**
 * @jest-environment jsdom
 */
import React from 'react'
import {  BrowserRouter as Router } from "react-router-dom"

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import { Provider } from 'react-redux'

import BlogList from 'src/components/presentational/BlogList'

import { blogs, comments, users, getStore } from 'src/lib/testHelpers'

describe('<BlogList/>', () => {
	let component;
	beforeEach( () => {
		component = render(
			<Router>
				<Provider store={getStore(blogs, users[0], comments, users)}>
					<BlogList />
				</Provider>
			</Router>
		)
	})
	afterEach(cleanup)

	test('Renders loggedin user\'s blogs correctly', () => {
		const titleText = 'Your blogs'
		const title = component.container.querySelector('.user-blogs h2')
		expect(title).toHaveTextContent(titleText)
		blogs.forEach( (b, i) => {
			const link = component.container.querySelector(`.user-blogs a[href="/blogs/${b.id}"]`)
			if(users[0].id === b.user.id){
				expect(link).not.toBeNull()
				expect(link).toHaveTextContent(b.title)
			}
			else {
				expect(link).toBeNull()
			}
		})
	})

	test('Renders loggedin user\'s blogs correctly', () => {
		const titleText = 'All blogs'
		const title = component.container.querySelector('.all-blogs h2')
		expect(title).toHaveTextContent(titleText)
		blogs.forEach( b => {
			const link = component.container.querySelector(`.all-blogs a[href="/blogs/${b.id}"]`)
			expect(link).not.toBeNull()
			expect(link).toHaveTextContent(b.title)	
		})
	})

})

