import React, { useEffect } from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"
import {  BrowserRouter as Router, Route } from "react-router-dom"

// import { setToken, setUser } from 'Reducers/loginReducer'
import { setToken, setUser } from 'reducers/loginReducer'

import { Container } from 'semantic-ui-react'
import LoginNav from "components/presentational/LoginNav"
import HomePage from "components/pages/HomePage"

// const { default: LoggedInContent } = await import(/* webpackPreload: true */'Containers/LoggedInContent')
// const { default: Notification } = await import(/* webpackPreload: true */'Presentationals/Notification')
// const { default: LoginPage } = await import(/* webpackPrefetch: true */'Pages/LoginPage')
// const { default: SignupPage } = await import(/* webpackPrefetch: true */'Pages/SignupPage')

import LoggedInContent from 'components/container/LoggedInContent'
import Notification from 'components/presentational/Notification'
import LoginPage from 'components/pages/LoginPage'
import SignupPage from 'components/pages/SignupPage'

const App = (props) => {
  const {
    setToken,
    setUser,
    login,
  } = props

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      setUser(user)
    }
  }, [])

  if (login.token === '') {
    return (
      <Container>
        <Router>
          <Notification />
          <LoginNav />
          <header>
            <h1>Favorite Blogs</h1>
          </header>
          <Route exact path='/' render={() =>
					<>
            <main>
							<HomePage />
						</main>
						<footer>
							<a href="https://www.freepik.com/vectors/business" className="credits">
								Business vector created by pch.vector - www.freepik.com
							</a>
						</footer>
					</>
          }>
          </Route>
          <Route exact path='/login' render={() =>
            <main>
              <LoginPage />
            </main>
          }>
          </Route>
          <Route path='/signup' render={() =>
            <main>
              <SignupPage />
            </main>
          }>
          </Route>
        </Router>
      </Container>
    )
  }

  return (
    <Container >
      <LoggedInContent />
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  }
}

const mapDispatchToProps = {
  setToken,
  setUser,
}

App.propsTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)