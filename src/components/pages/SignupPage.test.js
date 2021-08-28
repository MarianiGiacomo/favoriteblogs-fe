/**
 * @jest-environment jsdom
 */
import React from 'react'
import {  BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import { Provider } from 'react-redux'

import SignupPage from 'src/components/pages/SignupPage'

import { blogs, comments, users, getStore } from 'src/lib/testHelpers'

jest.mock('src/services/blogs')

describe('<SignupPage/>', () => {
  let component
  beforeEach( () => {
    component = render(
      <Router>
        <Provider store={getStore(blogs, users[0], comments)}>
          <SignupPage />
        </Provider>
      </Router>
    )
  })
  afterEach(cleanup)

  test('renders the signup form', () => {
    const container = component.container
    const titleText = 'Sign up with a test user'
    const infoText = 'The created user will be automatically removed within 24 hours'
    const title = container.querySelector('h2')
    const info = container.querySelector('h2 ~ p')
    const form = container.querySelector('form')
    expect(title).toHaveTextContent(titleText)
    expect(info).toHaveTextContent(infoText)
    expect(form).not.toBeNull()
  })
})

