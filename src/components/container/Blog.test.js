/**
 * @jest-environment jsdom
 */

import React from 'react'
import {  BrowserRouter as Router } from "react-router-dom"
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import Blog from 'components/container/Blog'

import blogServiceMock from 'services/__mocks__/blogs'
import blogService from 'services/blogs'

jest.mock('../../services/blogs')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const blogs = blogServiceMock.blogs
const comments = blogServiceMock.comments
const login = { username: 'user1'}
const initialState = { blogs,  login , comments }
const store = mockStore(initialState)

const match = (blog) => ({ params: { id: blog.id } })



describe('test blog component', () => {
	afterEach(cleanup)
  test('renders right content', () => {
		blogs.forEach( b => {
			const component = render(
				<Provider store={store}>
					<Blog 
						match={match(b)}
					/>
				</Provider>
			)

			const container = component.container
			const blogTitle = container.querySelector('h1')
			const blogAuthor = container.querySelector('h2')
			const blogLink = container.querySelector('.link')
			const blogLikes = container.querySelector('.likes')
			expect(blogTitle).toHaveTextContent(b.title)
			expect(blogAuthor).toHaveTextContent(b.author)
			expect(blogLink).toHaveTextContent(b.url)
			expect(blogLikes).toHaveTextContent(b.likes)
		})
  })

  test('clicking the like buttons calls update in blog service', () => {
		blogService.update = jest.fn();
    const { getByText } = render(
			<Provider store={store}>
				<Blog 
					match={match(blogs[0])}
				/>
			</Provider>
    )
    const button = getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(blogService.update.mock.calls.length).toBe(2)
  })

	test('displays comments', () => {
    const { getByText } = render(
			<Provider store={store}>
				<Blog 
					match={match(blogs[0])}
				/>
			</Provider>
    )
		const comment = getByText(comments[0].comment)
		expect(comment).toHaveTextContent(comments[0].comment)
	})

	test('clicking the remove buttons calls remove in blog service', () => {
		blogService.remove = jest.fn()
		window.confirm = jest.fn(() => true)
    const { getByText } = render(
			<Provider store={store}>
				<Router>
					<Blog 
						match={match(blogs[0])}
					/>
				</Router>
			</Provider>
    )
    const button = getByText('Remove')
    fireEvent.click(button)
    expect(blogService.remove.mock.calls.length).toBe(1)
	})
})

