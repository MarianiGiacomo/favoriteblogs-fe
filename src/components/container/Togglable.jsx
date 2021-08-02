import React, { useState } from "react"

import { PropTypes } from 'prop-types'

import { Button } from 'semantic-ui-react'

const Togglable = (props) => {
  const { buttonLabel, children } = props
  const [visible, setVisible] = useState(false)

  const hide = () => setVisible(false)

  const childrenWithProps = React.Children.map(children,
    child => React.cloneElement(child, { hide }))

  return (
    <div>
      { visible ?
        <>
          { childrenWithProps }
          <Button onClick={() => setVisible(!visible)} >Cancel</Button>
        </>
        :
        <Button onClick={() => setVisible(!visible)} >{buttonLabel}</Button>
      }
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable