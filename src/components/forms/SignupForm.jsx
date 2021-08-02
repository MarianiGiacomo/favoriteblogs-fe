import React, { useEffect } from "react"

import { PropTypes } from 'prop-types'

import { Form } from 'semantic-ui-react'

const SignupForm = (props) => {
  const { handleSignup, username, name, password } = { ...props }

	useEffect(() => {
		document.querySelector('input').focus()
	}, [])

  return (
    <>
      <Form onSubmit={handleSignup} className='login-form'>
        <Form.Group>
          <Form.Input
            required
            label="Username"
            id='username'
            name={username.name}
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            required
            label="Name"
            id='name'
            name={name.name}
            type={name.type}
            value={name.value}
            onChange={name.onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            required
            label="Password"
            id='password'
            name={password.name}
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </Form.Group>
        <Form.Button type='submit'>Create</Form.Button>
      </Form>
    </>
  )
}

SignupForm.propTypes = {
  handleSignup: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default SignupForm