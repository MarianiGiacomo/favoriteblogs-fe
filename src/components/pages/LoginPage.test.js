/**
 * @jest-environment jsdom
 */
import React from 'react'
import {  BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import { Provider } from 'react-redux'

import LoginPage from 'src/components/pages/LoginPage'

import { blogs, comments, users, getStore } from 'src/lib/testHelpers'

jest.mock('src/services/blogs')

describe('<LoginPage/>', () => {
  let component
  beforeEach( () => {
    component = render(
      <Router>
        <Provider store={getStore(blogs, users[0], comments, users)}>
          <LoginPage />
        </Provider>
      </Router>
    )
  })
  afterEach(cleanup)

  test('renders the login form', () => {
    const titleText = 'Login'
    const loginFormTitle = component.container.querySelector('h2')
    const form = component.container.querySelector('form')
    expect(loginFormTitle).toHaveTextContent(titleText)
    expect(form).not.toBeNull()
  })

})

