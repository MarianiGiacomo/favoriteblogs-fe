/**
 * @jest-environment jsdom
 */
import React from 'react'

import {  BrowserRouter as Router } from "react-router-dom"

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import Nav from '/src/components/presentational/Nav'

import { navLinks } from '/src/lib/testHelpers'

describe('<Nav/>', () => {
	let component
	let username = 'testuser'
	beforeEach( () => {
		component = render(
				<Router>
					<Nav username={username} />
				</Router>
		)
	})
	afterEach(cleanup)

	test('Renders correct links', () => {
		navLinks.forEach((l, i) => {
			const link = component.container.querySelector(`a[href="${l[1]}"]`)
			expect(link).not.toBeNull()
			expect(link).toHaveTextContent(l[0])
		})
	})

	test('Displays username', () => {
		const lableText = `${username} logged in`
		const userLable = component.container.querySelector('.item')
		expect(userLable).toHaveTextContent(lableText)
	})

	test('Displays logout button', () => {
		const button = component.container.querySelector('button.logout')
		expect(button).not.toBeNull()
	})

})

