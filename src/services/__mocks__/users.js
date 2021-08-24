// eslint-disable-next-line no-undef
const users = [
	{
		_id: '5a437a9e514ab7f168ddf138',
		username: 'user1',
		name: 'User Uno'
	},
	{
		_id: '5a437a9e514ab7f168ddf138',
		username: 'user2',
		name: 'User Due'
	},
	{
		_id: '5a437a9e514ab7f168ddf138',
		username: 'user3',
		name: 'User Tre'
	}
]

const getAll = jest.fn( () => {
		return Promise.resolve(users)
	}
)

const createUser = jest.fn(credentials => {
		return Promise.resolve(true)
	}
)

export default { getAll, createUser }