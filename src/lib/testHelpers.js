import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

export const match = (el) => ({ params: { id: el.id } })

export function getStore(blogs, login, comments, users, notification){
	const middlewares = [thunk]
	const mockStore = configureStore(middlewares)
	const initialState = { blogs, login , comments, users, notification }
	return mockStore(initialState)
}

export const loginNavLinks = [
	[ 'Home', '/' ],
	[ 'Login', '/login' ],
	[ 'Signup', '/signup']
]

export const navLinks = [
	[ 'Blogs', '/' ],
	[ 'Users', '/users' ]
]

export const blogs = [
  {
    id: '5d3418e34321a71139456f84',
    author: 'author 1',
    title: 'title 1',
    user: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'user1',
      name: 'User Uno'
    },
		url: 'https://testurl1.com',
		likes: 1
  },
  {
    id: '5a451e21e0b8b04a45638211',
    author: 'author 2',
    title: 'title 2',
    user: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'user1',
      name: 'User Uno'
    },
		url: 'https://testurl2.com',
		likes: 2
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    author: 'author 3',
    title: 'title 3',
    user: {
      id: '5a437a9e514ab7f168ddf139',
      username: 'user2',
      name: 'User Due'
    },
		url: 'https://testurl3.com',
		likes: 3
  },
]

export const comments = [
	{ 
		comment: 'test comment',
		timeStamp: new Date().toDateString(),
		user: {
			name: 'User Uno',
			username: 'user1'
		}	
	}
]

export const users = [
	{
		id: '5a437a9e514ab7f168ddf138',
		username: 'user1',
		name: 'User Uno'
	},
	{
		id: '5a437a9e514ab7f168ddf139',
		username: 'user2',
		name: 'User Due'
	},
	{
		id: '5a437a9e514ab7f168ddf140',
		username: 'user3',
		name: 'User Tre'
	}
]

