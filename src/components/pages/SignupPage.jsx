import React from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"

import { setNotification } from 'Reducers/notificationReducer'

import SignupForm from 'Forms/SignupForm'

import userService from 'Services/users'
import { useField } from 'Hooks'
import { getFieldsValues } from 'Lib'

const SignupPage = props => {
  const username = useField('text', 'username')
  const name = useField('name', 'name')
  const password = useField('password', 'password')
  const { setNotification } = props

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      const newUser = await userService.createUser(getFieldsValues(username, name, password))
      setNotification({ message: `User with username ${newUser.username} created` })
    } catch (exception) {
      setNotification({ error: `Could not create user: ${exception.message}` })
    }
  }

  return (
    <div className="card">
      <h2>Sign up with a test user</h2>
      <p>
				&#10071;<strong>The created user will be automatically removed within 24 hours</strong>
      </p>
      <SignupForm handleSignup={handleSignup} username={username} name={name} password={password}/>
    </div>
  )
}

const mapDispatchToProps =   {
  setNotification,
}

SignupPage.propTypes = {
  setNotification: PropTypes.func.isRequired,
}

export default connect(
  null,
  mapDispatchToProps
)(SignupPage)
