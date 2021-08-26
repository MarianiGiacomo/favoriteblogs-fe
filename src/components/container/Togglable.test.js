/**
 * @jest-environment jsdom
 */
import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'

import Togglable from './Togglable'

const buttonLabel = "show"

afterEach(cleanup)

describe('<Togglable/>', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel={buttonLabel}>
        <TestDiv />
      </Togglable>
    )
  })

  test('renders its childer', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start the childer are not displayed', () => {
    const div = component.container.querySelector('.testDiv')
    expect(div).toBeNull()
  })

  test('after clicking the button, childer are displayed', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const div = component.container.querySelector('.testDiv')
    expect(div).toBeTruthy()
  })
})

function TestDiv(props) {
	return (
		<div className='testDiv'></div>
	)
}