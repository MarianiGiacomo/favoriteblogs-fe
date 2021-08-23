const blogs = [
  {
    id: '5d3418e34321a71139456f84',
    author: 'author 1',
    title: 'title 1',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
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
      _id: '5a437a9e514ab7f168ddf138',
      username: 'user2',
      name: 'User Due'
    },
		url: 'https://testurl2.com',
		likes: 2
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    author: 'author 3',
    title: 'title 3',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'user3',
      name: 'User Tre'
    },
		url: 'https://testurl3.com',
		likes: 3
  },
]

const comments = [
	{ 
		comment: 'test comment',
		timeStamp: new Date().toDateString(),
		user: {
			name: 'User Uno',
			username: 'user1'
		}	
	}
]

const getAll = jest.fn( () => {
		return Promise.resolve(blogs)
	}
)

const create = jest.fn( (token, newObject) => {
		return Promise.resolve(true)
	}
)

const update = jest.fn( (id, newObject) => {
		return Promise.resolve(true)
	}
)

const remove = jest.fn( (token, id) => {
		return Promise.resolve(true)
	}
)

const getComments = jest.fn(
	(id) => {
		return Promise.resolve(comments)
	}
 )

const createComment = jest.fn( (token, newObject) => {
		return Promise.resolve(true)
	}
)

export default {
	blogs,
	comments,
  getAll,
  create,
  update,
  remove,
  getComments,
  createComment,
}
// const setToken = () => 'token'

// export default { getAll, setToken }