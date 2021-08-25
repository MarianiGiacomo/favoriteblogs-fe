/**
 * @jest-environment jsdom
 */
import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'

import { useField } from 'hooks/index'

import BlogForm from 'components/forms/BlogForm'

jest.mock('hooks')

describe('<BlogForm/>', () => {
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')
	const handleSubmit = jest.fn()
	let component;
	beforeEach( () => {
		component = render(
			<BlogForm 
				title={title}
				author={author}
				url={url}
				handleSubmit={handleSubmit}
			/>
		)
	})
	afterEach(cleanup)

	test('Submits the data', () => {
		let submitButton = component.container.querySelector('[type="submit"]')
		fireEvent.click(submitButton)
		expect(handleSubmit.mock.calls.length).toBe(1)
	})
})