import React, { useState, useEffect } from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { List } from 'semantic-ui-react'

import { emptyObj, populateWithBlogs, getUserById } from 'lib'

const User = (props) => {
  const [user, setUser] = useState({})
  const { users, blogs, match } = props

  useEffect(() => {
    if(users.length && blogs.length) {
      setUser(getUserById(populateWithBlogs(users, blogs), match.params.id))
    }
  },[users, blogs])

  if(user === undefined) {
    return <Redirect to='/users'/>
  }
  else if(emptyObj(user)) {
    return (
      <main>
        <div className="loader"></div>
        <p>Fetching user...</p>
      </main>
    )
  }
  else {
    return (
      <main>
        <h1>{user.name}</h1>
        <h2>Blogs</h2>
        <List divided relaxed>
          {
            user.blogs.length
              ? user.blogs.map((b,i) =>
                <List.Item key={i} >
                  <p className="blog-title">{b.title}</p>
                  <p className="blog-author">by {b.author}</p>
                  <a href={b.url}>{b.url}</a>
                </List.Item>
              )
              : <List.Item><p>No blogs yet</p></List.Item>
          }
        </List>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
  }
}

User.propTypes = {
  users: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps, null
)(User)