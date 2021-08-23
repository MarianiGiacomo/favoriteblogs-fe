import React, { useState } from "react"

import { PropTypes } from 'prop-types'

import { Link } from "react-router-dom"

import Logout from 'components/presentational/Logout'
import { Menu } from 'semantic-ui-react'

const Nav = (props) => {
  const {
    username
  } = props
  const [activeItem, setActiveItem] = useState(window.location.pathname.substr(1) || 'blogs')

  return (
    <nav>
      <Menu widths='4'>
        <Menu.Item active={activeItem === 'blogs'}>
          <Link to={'/'} onClick={ () => setActiveItem('blogs')}>Blogs</Link>
        </Menu.Item>
        <Menu.Item active={activeItem === 'users'}>
          <Link to={'/users'} onClick={ () => setActiveItem('users')}>Users</Link>
        </Menu.Item>
        <Menu.Item>{username} logged in</Menu.Item>
        <Menu.Item><Logout /></Menu.Item>
      </Menu>
    </nav>

  )
}

Nav.propTypes = {
  username: PropTypes.string.isRequired,
}

export default Nav