/**
 * @jest-environment jsdom
 */
import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, cleanup, fireEvent } from '@testing-library/react'

import hooks from 'src/hooks'

import SignupForm from 'src/components/forms/SignupForm'

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

describe('<SignupForm/>', () => {
	const useField = hooks.useField
  const username = useField('text', 'username')
  const name = useField('text', 'name')
  const password = useField('password', 'password')
	const handleSignup = jest.fn()
	let component;
	beforeEach( () => {
		component = render(
			<SignupForm 
				username={username}
				password={password}
				name={name}
				handleSignup={handleSignup}
			/>
		)
	})
	afterEach(cleanup)

	test('Receives user input', () => {
		const usernameInput = component.getByText('Username')
		const text = 'username'
		userEvent.type(usernameInput, text)
		expect(setValue.mock.calls.length).toBe(text.length)
	})

	test('Submits the data', () => {
		let submitButton = component.container.querySelector('[type="submit"]')
		fireEvent.click(submitButton)
		expect(handleSignup.mock.calls.length).toBe(1)
	})
})