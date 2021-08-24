/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './App'
import blogServiceMock from 'services/__mocks__/blogs'

jest.mock('./services/blogs')
jest.mock('./services/users.js')

function getStore(blogs, login, comments){
	const middlewares = [thunk]
	const mockStore = configureStore(middlewares)
	const initialState = { blogs, login , comments }
	return mockStore(initialState)
}

describe('<App />', () => {
	afterEach(cleanup)
  test('if no user logged in, displays homepage', async () => {
		const blogs = blogServiceMock.blogs
		const comments = blogServiceMock.comments
		const login = { token: '' }
    const component = render(
      <Provider store={getStore(blogs, login, comments)}>
        <App />
      </Provider>
    )
		const title = component.container.querySelector('h1')
    expect(title).toHaveTextContent('Favorite Blogs')
  })

  test('if user is logged in, display blogs', async () => {
		const blogs = blogServiceMock.blogs
		const comments = blogServiceMock.comments
    const user = {
      username: 'user1',
      token: '1231231214',
      name: 'User Uno'
    }
    const component = render(
      <Provider store={getStore(blogs, user, comments)}>
        <App />
      </Provider>
    )
    await waitFor(
      () => component.container.querySelector('.loggedin-content')
    )
		const LoggedInContent = component.container.querySelector('.loggedin-content')
		expect(LoggedInContent).toBeTruthy()
  })
})