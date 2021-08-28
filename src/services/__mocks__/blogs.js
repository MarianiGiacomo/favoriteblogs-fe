import { blogs, comments } from 'src/lib/testHelpers'

const getAll = jest.fn( () => {
  return Promise.resolve(blogs)
}
)

const create = jest.fn( () => {
  return Promise.resolve(true)
}
)

const update = jest.fn( () => {
  return Promise.resolve(true)
}
)

const remove = jest.fn( () => {
  return Promise.resolve(true)
}
)

const getComments = jest.fn(
  () => {
    return Promise.resolve(comments)
  }
)

const createComment = jest.fn( () => {
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