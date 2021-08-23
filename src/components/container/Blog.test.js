/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
// import SimpleBlog from './SimpleBlog'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import blogReducer from 'reducers/blogReducer'
import commentReducer from 'reducers/commentReducer'
import loginReducer from 'reducers/loginReducer'
import notificationReducer from 'reducers/notificationReducer'
import usersReducer from 'reducers/usersReducer'

import Blog from 'components/container/Blog'
import blogsServiceMock from 'services/__mocks__/blogs'

jest.mock('../../services/blogs')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

afterEach(cleanup)

describe('test blog component', () => {
	const blogs = blogsServiceMock.blogs
	const comments = blogsServiceMock.comments

	const initialState = { blogs,  login: {}, comments }
	const store = mockStore(initialState)
	
  test('renders right content', () => {
		blogs.forEach( b => {
			const match = {
				params: {
					id: b.id
				}
			}
			const component = render(
				<Provider store={store}>
					<Blog 
						match={match}
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

  // test('clicking the likes butotn twice', async () => {
  //   const mockOnClick = jest.fn()

  //   const { getByText } = render(
  //     <SimpleBlog blog={blog} onClick={mockOnClick}/>
  //   )

  //   const button = getByText('likes')
  //   fireEvent.click(button)
  //   fireEvent.click(button)

  //   expect(mockOnClick.mock.calls.length).toBe(2)
  // })
})

