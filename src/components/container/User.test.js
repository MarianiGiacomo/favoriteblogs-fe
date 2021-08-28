/**
 * @jest-environment jsdom
 */
import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import { Provider } from 'react-redux'
import User from 'src/components/container/User'

import { blogs, comments, users, match, getStore } from 'src/lib/testHelpers'
import { populateWithBlogs, getUserById } from 'src/lib/index'

describe('<User/>', () => {
  let component
  beforeEach(() => {
    component = render(
      <Provider store={getStore(blogs, users[0], comments, users)}>
        <User match={match(users[0])}/>
      </Provider>
    )
  })
  afterEach(cleanup)

  test('Renders the user by the given id', () => {
    const title = component.container.querySelector('h1')
    expect(title).toHaveTextContent(users[0].name)
  })

  test('Renders the given user\'s blogs', () => {
    const userWithBlogs = getUserById(populateWithBlogs(users, blogs), users[0].id)
    const blogsTitles = component.container.querySelectorAll('.blog-title')
    const blogsAuthors = component.container.querySelectorAll('.blog-author')
    const blogsLinks = component.container.querySelectorAll('a')
    userWithBlogs.blogs.forEach((b, i) => {
      expect(blogsTitles[i]).toHaveTextContent(userWithBlogs.blogs[i].title)
      expect(blogsAuthors[i]).toHaveTextContent(userWithBlogs.blogs[i].author)
      expect(blogsLinks[i]).toHaveTextContent(userWithBlogs.blogs[i].url)
    })
  })
})