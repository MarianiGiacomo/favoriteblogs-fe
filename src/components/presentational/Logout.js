import React from 'react'

import { Button } from 'semantic-ui-react'

const Logout = () => (
	<Button className="logout" onClick={handleLogout} >Logout</Button>
)

const handleLogout = () => {
  window.localStorage.clear()
  window.location.href = window.location.origin
}

export default Logout