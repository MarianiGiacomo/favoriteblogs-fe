import React from "react"

import { PropTypes } from 'prop-types'

import { Form } from 'semantic-ui-react'

const CommentForm = (props) => {
  const { comment, handleSubmit, hide } = props
  const onSubmit = (event) => {
    handleSubmit(event)
    if(hide) hide()
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Input
          required
          label='Leave a comment'
          id='comment'
          name={comment.name}
          type={comment.type}
          value={comment.value}
          onChange={comment.onChange}
        />
        <Form.Button type='submit'>Save</Form.Button>
      </Form>
    </div>
  )
}

CommentForm.propTypes = {
  comment: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hide: PropTypes.func
}

export default CommentForm