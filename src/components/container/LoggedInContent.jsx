import React, { useState, useEffect } from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom"

import { setNotification } from 'Reducers/notificationReducer'
import { getUsers } from 'Reducers/usersReducer'
import { initializeBlogs } from 'Reducers/blogReducer'

import Notification from 'Presentationals/Notification'
import Nav from 'Presentationals/Nav'
import BlogsPage from 'Pages/BlogsPage'
const { default: Blog } = await import(/* webpackPrefetch: true */'Containers/Blog')
const { default: User } = await import(/* webpackPrefetch: true */'Containers/User')
const { default: UsersPage } = await import(/* webpackPrefetch: true */'Pages/UsersPage')

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
			console.log(exception)
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

