/**
 * @jest-environment jsdom
 */
import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, cleanup, fireEvent } from '@testing-library/react'

import hooks from 'src/hooks'

import BlogForm from 'src/components/forms/BlogForm'

const setValue = jest.fn( (value) => value)

hooks.useField = jest.fn( (type, name) => {
		let value = ''

		const onChange = (event) => {
			value = setValue(event.target.value)
		}

		return {
			name,
			type,
			value,
			onChange,
			setValue,
		}
	}
)

describe('<BlogForm/>', () => {
	const useField = hooks.useField
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

	test('Receives user input', () => {
		const titleInput = component.getByText('Title')
		const text = 'test'
		userEvent.type(titleInput, text)
		expect(setValue.mock.calls.length).toBe(text.length)
	})

	test('Submits the data', () => {
		let submitButton = component.container.querySelector('[type="submit"]')
		fireEvent.click(submitButton)
		expect(handleSubmit.mock.calls.length).toBe(1)
	})
})