/**
 * @jest-environment jsdom
 */
import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'

import Logout from '/src/components/presentational/Logout'

describe('<Logout/>', () => {
	let component, button;
	beforeEach( () => {
		component = render(
				<Logout />
		)
		button = component.container.querySelector('button.logout')
	})
	afterEach(cleanup)

	test('Renders logout button', () => {
		const buttonText = 'Logout'
		expect(button).not.toBeNull()
		expect(button).toHaveTextContent(buttonText)
	})

	test('Clears windows.localStorage on click', () => {
		window.localStorage.setItem('test', 'test')
		fireEvent.click(button)
		expect(window.localStorage.getItem('test')).toBeNull()
	})

	test('Resets window.location.href to origin on click', () => {
		window.location.href = 'http://localhost/#test'
		fireEvent.click(button)
		expect(window.location.href).toBe(window.location.origin + '/')
	})
	
})

