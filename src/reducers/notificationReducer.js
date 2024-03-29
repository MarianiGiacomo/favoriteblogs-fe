
const notificationReducer = (state = {}, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const setNotification = ( (notification) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
  }
})

export default notificationReducer