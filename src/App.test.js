/**
 * @jest-environment jsdom
 */
import React from 'react'

import { render, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Provider } from 'react-redux'

import App from './App'

import { blogs, comments, users, getStore } from 'lib/testHelpers'

jest.mock('services/blogs')
jest.mock('services/users.js')

describe('<App/>', () => {
	afterEach(cleanup)
  test('if no user logged in, displays homepage', async () => {
    const component = render(
      <Provider store={getStore(blogs, { token: '' }, comments)}>
        <App />
      </Provider>
    )
		const title = component.container.querySelector('h1')
    expect(title).toHaveTextContent('Favorite Blogs')
  })

  test('if user is logged in, display blogs', async () => {
    const component = render(
      <Provider store={getStore(blogs, users[0], comments)}>
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