/**
 * @jest-environment jsdom
 */
import React from 'react'

import {  BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import LoginNav from '/src/components/presentational/LoginNav'

import { loginNavLinks } from '/src/lib/testHelpers'

describe('<LoginNav/>', () => {
  let component
  beforeEach( () => {
    component = render(
      <Router>
        <LoginNav />
      </Router>
    )
  })
  afterEach(cleanup)

  test('Renders correct links', () => {
    loginNavLinks.forEach(l => {
      const link = component.container.querySelector(`a[href="${l[1]}"]`)
      expect(link).not.toBeNull()
      expect(link).toHaveTextContent(l[0])
    })
  })
})

