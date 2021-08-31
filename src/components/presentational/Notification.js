import React from 'react'

import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import { Modal, Button } from 'semantic-ui-react'

import "wicg-inert";

import { setNotification } from 'src/reducers/notificationReducer'

const Notification = (props) => {
  const { notification, setNotification } = props
  const message = notification?.message
  const error = notification?.error

  const closeModal = () => {
		document.querySelector('.inert-on-modal').inert = false
    setNotification('')
  }

  return (
    <Modal
      open={message || error ? true : false}
      onClose={() => closeModal()}
      className={`notification ${message ? 'message' : 'error'}`}
      role="dialog"
			aria-modal="true"
			aria-live="assertive"
    >
      <i>
        {setText()}
      </i>
      <Modal.Actions>
        <Button id="modal-close" color='red' onClick={() => closeModal()}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )

  function setText() {
    if(message || error) {
      setTimeout(() => setFocus(), 200)
      return message ? message : error
    }
  }

  function setFocus() {
    const button = document.getElementById('modal-close')
    const modal = document.querySelector('.modal')
    if(button && modal) {
      button.focus()
			document.querySelector('.inert-on-modal').inert = true
    }
  }

}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification,
}

Notification.propTypes = {
  setNotification: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)