const login = jest.fn(() => {
  return Promise.resolve(true)
})
export default { login }