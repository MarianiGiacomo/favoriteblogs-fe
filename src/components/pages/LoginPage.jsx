import React from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"

import { setNotification } from 'Reducers/notificationReducer'
import { setToken, setUser } from 'Reducers/loginReducer'

import LoginForm from 'Forms/LoginForm'

import loginService from 'Services/login'
import { useField } from 'Hooks'
import { getFieldsValues } from 'Lib'

const LoginPage = (props) => {
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const { setToken, setUser, setNotification } = props

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(getFieldsValues(username, password))
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
			window.location.href = window.location.origin
    } catch (exception) {
      username.setValue('')
      password.setValue('')
      setNotification({ error: `Login failed: ${exception.message}` })
    }
  }

  return (
    <>
      <main>
        <div className="card">
          <LoginForm handleLogin={handleLogin} username={username} password={password}/>
        </div>
      </main>
    </>
  )
}

const mapDispatchToProps =   {
  setNotification,
  setToken,
  setUser,
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default connect(
  null,
  mapDispatchToProps
)(LoginPage)
