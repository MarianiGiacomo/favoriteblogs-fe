import React from "react"

import { PropTypes } from 'prop-types'

import { Form } from 'semantic-ui-react'

function BlogForm(props) {
  const { handleSubmit, title, author, url, hide } = props
  const onSubmit = (event) => {
    handleSubmit(event)
    if (hide) hide()
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <Form onSubmit={onSubmit}>
        <Form.Input
          required
          label="Title"
          id='title'
          type={title.type}
          name={title.name}
          value={title.value}
          onChange={title.onChange}
        />
        <Form.Input
          required
          label="Author"
          id='author'
          type={author.type}
          name={author.name}
          value={author.value}
          onChange={author.onChange}
        />
        <Form.Input
          required
          label="URL"
          id='url'
          type={url.type}
          name={url.name}
          value={url.value}
          onChange={url.onChange}
        />
        <Form.Button type='submit'>Save</Form.Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  hide: PropTypes.func
}

export default BlogForm