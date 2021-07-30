import React from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"

import { Modal, Button } from 'semantic-ui-react'

import { setNotification } from 'Reducers/notificationReducer'

const Notification = (props) => {
  const { notification, setNotification } = props
  const message = notification.message
  const error = notification.error

  const closeModal = () => {
    setNotification('')
  }

  return (
    <Modal
      open={message || error ? true : false}
      onClose={() => closeModal()}
      className={`notification ${message ? 'message' : 'error'}`}
      role="alert"
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
      setTimeout(() => setFocus(5), 200)
      return message ? message : error
    }
  }

  function setFocus(retry) {
    const button = document.getElementById('modal-close')
    const modal = document.querySelector('.modal')
    if(button && modal) {
      // modal.querySelector('i').setAttribute('aria-live', 'assertive')
      button.focus()
      modal.addEventListener('keydown', (e) => {
        if(e.key === 'Tab'){
          e.preventDefault()
          button.focus()
        }
      })
    }
    else if(retry > 0) {
      setFocus(retry --)
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
  setNotification: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)