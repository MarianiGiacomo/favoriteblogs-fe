export const filterBlogs = (blogs, user) => {
  return blogs.filter(blog => {
    return blog?.user?.username === user.username
  }
  )
}

export const getFieldsValues = (...fields) => {
  const credentials = {}
  fields.forEach(f => {
    credentials[f.name] = f.value
  })
  return credentials
}

export const checkUrl = (url) => {
  if(url.substring(0,7) === 'http://' | url.substring(0,8) === 'https://'){
    return true
  }
  return false
}

export const populateWithBlogs = (users, blogs) => {
  return users.map( u => {
    let uBlogs = blogs.filter( b => b?.user?.id === u.id )
    return { ...u, blogs: uBlogs }
  })
}

export const getUserById = (users,id) => users.find(u => u.id === id)

export const emptyObj = (obj) => Object.keys(obj).length === 0

export async function callWithTryCatchAsync(tryFunc, catchFunc) {
  try {
    await tryFunc()
  } catch (exception) {
    catchFunc(exception)
  }
}

export const constructComment = (comment, blog) => {
  return {
    comment: comment.value,
    timeStamp: new Date().toDateString(),
    blog: blog.id
  }
}