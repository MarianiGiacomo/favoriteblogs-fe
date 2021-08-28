/**
 * @jest-environment jsdom
 */
import React from 'react'
import {  BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import { Provider } from 'react-redux'

import BlogsPage from 'src/components/pages/BlogsPage'

import { blogs, comments, users, getStore } from 'src/lib/testHelpers'

jest.mock('src/services/blogs')

describe('<BlogsPage/>', () => {
  let component
  beforeEach( () => {
    component = render(
      <Router>
        <Provider store={getStore(blogs, users[0], comments, users)}>
          <BlogsPage />
        </Provider>
      </Router>
    )
  })
  afterEach(cleanup)

  test('renders right content', () => {
    const titleText = 'Blogs'
    const title = component.container.querySelector('h1')
    expect(title).toHaveTextContent(titleText)
  })
})

