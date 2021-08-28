import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

const LoginNav = () => {
  const [activeItem, setActiveItem] = useState(window.location.pathname.substr(1) || 'home')

  return (
    <nav>
      <Menu widths='4'>
        <Menu.Item active={activeItem === 'home'}>
          <Link to={'/'} onClick={ () => setActiveItem('home')}>Home</Link>
        </Menu.Item>
        <Menu.Item active={activeItem === 'login'}>
          <Link to={'/login'} onClick={ () => setActiveItem('login')}>Login</Link>
        </Menu.Item>
        <Menu.Item active={activeItem === 'signup'}>
          <Link to={'/signup'} onClick={ () => setActiveItem('signup')}>Signup</Link>
        </Menu.Item>
      </Menu>
    </nav>

  )
}

export default LoginNav