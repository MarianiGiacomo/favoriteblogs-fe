/**
 * @jest-environment jsdom
 */
import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, cleanup, fireEvent } from '@testing-library/react'

import hooks from 'src/hooks'

import CommentForm from 'src/components/forms/CommentForm'

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

describe('<CommentForm/>', () => {
  const useField = hooks.useField
  const comment = useField('text', 'Comment')
  const handleSubmit = jest.fn()
  let component
  beforeEach( () => {
    component = render(
      <CommentForm
        comment={comment}
        handleSubmit={handleSubmit}
      />
    )
  })
  afterEach(cleanup)

  test('Receives user input', () => {
    const commentInput = component.getByText('Leave a comment')
    const text = 'Comment'
    userEvent.type(commentInput, text)
    expect(setValue.mock.calls.length).toBe(text.length)
  })

  test('Submits the data', () => {
    let submitButton = component.container.querySelector('[type="submit"]')
    fireEvent.click(submitButton)
    expect(handleSubmit.mock.calls.length).toBe(1)
  })
})