const login = jest.fn(credentials => {
  	return Promise.resolve(true)
	}
)
export default { login }