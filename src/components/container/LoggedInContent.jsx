import React, { useState, useEffect } from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom"

import { setNotification } from 'reducers/notificationReducer'
import { getUsers } from 'reducers/usersReducer'
import { initializeBlogs } from 'reducers/blogReducer'

import Notification from 'components/presentational/Notification'
import Nav from 'components/presentational/Nav'
import BlogsPage from 'components/pages/BlogsPage'
// const { default: Blog } = await import(/* webpackPrefetch: true */'Containers/Blog')
// const { default: User } = await import(/* webpackPrefetch: true */'Containers/User')
// const { default: UsersPage } = await import(/* webpackPrefetch: true */'Pages/UsersPage')
import Blog from 'components/container/Blog'
import User from 'components/container/User'
import UsersPage from 'components/pages/UsersPage'

const LoggedInContent = (props) => {
  const [loading, setLoading] = useState(true)
  const {
    initializeBlogs,
    setNotification,
    getUsers,
    login,
  } = props

  useEffect( async () => {
    fetchWithRetry(2)
  },)

  return (
    <div className='loggedin-content'>
      <Router>
        <Nav username={login.username} />
        <Notification />
        { loading
          ? <>
            <div className="loader"></div>
            <p>Fetching data...</p>
          </>
          : null
        }
					<Route exact path='/' render={() => <BlogsPage /> }/>
					<Route path='/blogs/:id' render={({ match }) => <Blog match={match} />} />
					<Route exact path='(/blogs)' render={() => <Redirect to='/'/>} />
					<Route exact path='(/blogs/)' render={() => <Redirect to='/'/>} />
					<Route path='/users/:id' render={({ match }) => <User match={match} />} />
					<Route exact path='/users/)' render={() => <Redirect to='/users'/>} />
					<Route exact path='/users' render={() => <UsersPage /> } />
      </Router>
    </div>
  )

  async function fetchWithRetry(timeout) {
    try {
      await initializeBlogs()
      await getUsers()
      setLoading(false)
    } catch (exception) {
      setNotification({ error: `Could not fetch data: ${exception.message}. Retrying...` })
      setTimeout( () => {
        fetchWithRetry(timeout)
      }, timeout*1000)
    }
  }

}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  setNotification,
  getUsers,
}

LoggedInContent.propTypes = {
  initializeBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInContent)

