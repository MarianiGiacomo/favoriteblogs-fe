/**
 * @jest-environment jsdom
 */
import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'

import { Provider } from 'react-redux'

import LoggedInContent from './LoggedInContent'

import { getStore, blogs, users, comments } from 'lib/testHelpers'

import blogService from 'services/blogs'
import userService from 'services/users'

describe('LoggedInContent component', () => {
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
})