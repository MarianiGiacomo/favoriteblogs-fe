import React from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"

import { setNotification } from 'src/reducers/notificationReducer'

import SignupForm from 'src/components/forms/SignupForm'

import userService from 'src/services/users'
import { useField } from 'src/hooks'
import { getFieldsValues } from 'src/lib'

const SignupPage = props => {
  const username = useField('text', 'username')
  const name = useField('name', 'name')
  const password = useField('password', 'password')
  const { setNotification } = props

  const handleSignup = async (event, cleanup) => {
    event.preventDefault()
    try {
      const newUser = await userService.createUser(getFieldsValues(username, name, password))
      setNotification({ message: `User with username ${newUser.username} created` })
			cleanup()
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
      <SignupForm 
				handleSignup={(event) => handleSignup(event, () => clearFields(username, name, password))} 
				username={username} name={name} password={password}/>
    </div>
  )

	function clearFields(...fields){
		fields.forEach(f => f.setValue(''))
	}
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
