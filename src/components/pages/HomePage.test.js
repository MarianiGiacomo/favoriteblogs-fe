/**
 * @jest-environment jsdom
 */
import React from 'react'
import {  BrowserRouter as Router } from "react-router-dom"

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import HomePage from 'src/components/pages/HomePage'

jest.mock('src/services/blogs')

const socialLinks = [ 
	['Linkedin', 'https://fi.linkedin.com/in/giacomo-mariani'],
	['Medium', 'https://www.medium.com/@giacomo-mariani'],
	['GitHub', 'https://github.com/MarianiGiacomo/favoriteblogs']
]

describe('<HomePage/>', () => {
	let component;
	beforeEach( () => {
		component = render(
			<Router>
					<HomePage />
			</Router>
		)
	})
	afterEach(cleanup)

  test('renders the h2 header content', () => {
		const titleText = 'An application to save and share your favorite blogs.'
		const title = component.container.querySelector('h2')
		expect(title).toHaveTextContent(titleText)
	})

	test('Renders social links', () => {
		socialLinks.forEach( l => {
			const link = component.container.querySelector(`[href="${l[1]}"]`)
			expect(link).toHaveTextContent(l[0])
		})
	})
})

