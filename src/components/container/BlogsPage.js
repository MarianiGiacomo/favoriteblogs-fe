import React from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"

import { setNotification } from 'Reducers/notificationReducer'
import { createBlog } from 'Reducers/blogReducer'

import Togglable from 'Containers/Togglable'
import BlogForm from 'Forms/BlogForm'
import BlogList from 'Presentationals/BlogList'

import { useField } from 'Hooks'
import { checkUrl, getFieldsValues } from 'Lib'

const BlogsPage = (props) => {
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')
  const { login, setNotification, createBlog } = props

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!checkUrl(url.value)){
      setNotification({ error: 'Please use a valid URL as "https://" or "http://"' })
      return null
    }
    try {
      await createBlog(login.token, getFieldsValues(title, author, url))
      setNotification({ message: `A new blog "${title.value} by ${author.value}" added` })
      title.setValue('')
      author.setValue('')
      url.setValue('')
    } catch (exception) {
      setNotification({ error: `Could not add the blog: ${exception.message}` })
    }
  }

  return (
    <>
      <h1 aria-live="polite">Blogs</h1>
      <main>
        <BlogList />
        <Togglable buttonLabel='New blog'>
          <BlogForm
            handleSubmit={handleSubmit}
            title={title}
            author={author}
            url={url}
          />
        </Togglable>
      </main>
    </>
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification,
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

BlogsPage.propTypes = {
  login: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogsPage)

