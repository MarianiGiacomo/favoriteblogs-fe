/**
 * @jest-environment jsdom
 */
import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitFor } from '@testing-library/react'

import { Provider } from 'react-redux'

import LoggedInContent from 'src/components/container/LoggedInContent'

import { getStore, blogs, users, comments } from 'src/lib/testHelpers'

import blogService from 'src/services/blogs'
import userService from 'src/services/users'

describe('<LoggedInContent/>', () => {
	afterEach(cleanup)

	test('Calls blogs API', () => {
		blogService.getAll = jest.fn()
		const component = render(
			<Provider store={getStore(blogs, users[0], comments)}>
				<LoggedInContent />
			</Provider>
		)
		expect(blogService.getAll.mock.calls.length).toBe(1)
	})

	test('Calls users API', async () => {
		userService.getAll = jest.fn()
		const component = render(
			<Provider store={getStore(blogs, users[0], comments)}>
				<LoggedInContent />
			</Provider>
		)
    await waitFor(
      () => component.container.querySelector('.loggedin-content')
    )
		expect(userService.getAll.mock.calls.length).toBe(1)
	})

	test('With path "/" returns blogs page', async () => {	
		const component = render(
			<Provider store={getStore(blogs, users[0], comments)}>
				<LoggedInContent />
			</Provider>
		)
		let title;
		await waitFor(
			() => { 
				title = component.container.querySelector('h1') 
				return title
			}
		)
		expect(title).toHaveTextContent('Blogs')
	})
})