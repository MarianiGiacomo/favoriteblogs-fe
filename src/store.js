import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import commentReducer from './reducers/commentReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  login: loginReducer,
  users: usersReducer,
  comments: commentReducer
})

const store = createStore(
  reducer,
	applyMiddleware(thunk)
)

export default store