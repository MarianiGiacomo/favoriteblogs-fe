/**
 * @jest-environment jsdom
 */
import React from 'react'
import {  BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, cleanup, fireEvent } from '@testing-library/react'

import hooks from 'src/hooks'

import LoginForm from 'src/components/forms/LoginForm'

const setValue = jest.fn( (value) => value)

hooks.useField = jest.fn( (type, name) => {
  let value = ''

  const onChange = (event) => {
    value = setValue(event.target.value)
  }

  return {
    name,
    type,
    value,
    onChange,
    setValue,
  }
}
)

describe('<LoginForm/>', () => {
  const useField = hooks.useField
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const handleLogin = jest.fn()
  let component
  beforeEach( () => {
    component = render(
      <Router>
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      </Router>
    )
  })
  afterEach(cleanup)

  test('Receives user input', () => {
    const usernameInput = component.getByText('Username')
    const text = 'username'
    userEvent.type(usernameInput, text)
    expect(setValue.mock.calls.length).toBe(text.length)
  })

  test('Submits the data', () => {
    let submitButton = component.container.querySelector('[type="submit"]')
    fireEvent.click(submitButton)
    expect(handleLogin.mock.calls.length).toBe(1)
  })
})