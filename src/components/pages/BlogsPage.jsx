import React from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"

import { setNotification } from 'src/reducers/notificationReducer'
import { createBlog } from 'src/reducers/blogReducer'

import Togglable from 'src/components/container/Togglable'
import BlogForm from 'src/components/forms/BlogForm'
import BlogList from 'src/components/presentational/BlogList'

import { useField } from 'src/hooks'
import { checkUrl, getFieldsValues } from 'src/lib'

const BlogsPage = (props) => {
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')
  const { login, setNotification, createBlog } = props

  const handleSubmit = (event) => {
    event.preventDefault()
		return (login, values, cleanup) => {
			const { title, author, url } = { ...values }
			if(!checkUrl(url.value)){
				setNotification({ error: 'Please use a valid URL as "https://" or "http://"' })
			} else {
				tryCreateBlog(login.token, getFieldsValues(title, author, url), cleanup)
			}
		}
  }

  return (
    <>
      <h1 aria-live="polite">Blogs</h1>
      <main>
        <BlogList />
        <Togglable buttonLabel='New blog'>
          <BlogForm
            handleSubmit={(event) => { 
							handleSubmit(event)
							(login, { title, author, url }, () => resetFormFields(title, author, url)) 
						}}
            title={title}
            author={author}
            url={url}
          />
        </Togglable>
      </main>
    </>
  )

	async function tryCreateBlog(loginToken, values, cleanup){
		try {
			await createBlog(loginToken, values)
			setNotification({ message: `A new blog "${title.value} by ${author.value}" added` })
			cleanup()
		} catch (exception) {
			setNotification({ error: `Could not add the blog: ${exception.message}` })
		}
	}

	function resetFormFields(...params) {
		params.forEach(p => p.setValue(''))
	}
	
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

