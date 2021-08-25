import { blogs, comments } from "lib/testHelpers"

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
  getAll,
  create,
  update,
  remove,
  getComments,
  createComment,
}