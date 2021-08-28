import { users } from 'src/lib/testHelpers'

const getAll = jest.fn( () => {
  return Promise.resolve(users)
}
)

const createUser = jest.fn(() => {
  return Promise.resolve(true)
}
)

export default { getAll, createUser }