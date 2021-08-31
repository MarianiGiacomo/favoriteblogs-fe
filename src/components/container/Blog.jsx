import React, { useState, useEffect } from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { setNotification } from 'src/reducers/notificationReducer'
import { getBlogComments, addComment } from 'src/reducers/commentReducer'
import { removeBlog, likeBlog } from 'src/reducers/blogReducer'

import { Button, List } from 'semantic-ui-react'
import Togglable from 'src/components/container/Togglable'
import CommentForm from 'src/components/forms/CommentForm'

import { useField } from 'src/hooks'
import { emptyObj, constructComment, callWithTryCatchAsync } from 'src/lib'

const Blog = (props) => {
  const [removed, setRemoved] = useState(false)
  const [blog, setBlog] = useState({})
  const comment = useField('text', 'comment')
  const { blogs, comments, login, removeBlog, match,
    setNotification, getBlogComments, likeBlog, addComment } = props

  useEffect(() => {
    if(!emptyObj(blog) && !removed) {
			callWithTryCatchAsync(
				() => getBlogComments(blog), 
				(exception) => setNotification({ error: `Could not fetch comments: ${exception.message}` }) 
			)
    }
  },[blog])

  // On page load, after fetching blogs, get blog from url param.
  useEffect(() => {
    if(blogs.length) {
      const foundBl = blogs.find(b => b.id === match.params.id)
      setBlog(foundBl)
    }
  },[blogs])

  const handleSubmit = async (newComment, login, cleanup) => {
		try {
			await addComment(login.token, newComment)
			setNotification({ message: `A new comment "${newComment.comment}" added` })
			cleanup()
		} catch (exception) {
			setNotification({ error: `Could not add the comment: ${exception.message}` })
		}
  }

  if(removed || blog === undefined){
    return <Redirect to="/blogs"/>
  }
  else if(emptyObj(blog)){
    return (
      <main>
        <div className="loader"></div>
        <p>Fetching blog...</p>
      </main>
    )
  }
  else {
    return (
      <main>
        <h1>{blog?.title}</h1>
        <h2>By {blog?.author}</h2>
        <p className="link"><a href={blog?.url} target='_blank' rel='noopener noreferrer' >{blog.url}</a></p>
        <p className="likes">Likes: {blog?.likes}</p>
        <Button onClick={() => like(blog)} >Like</Button>
        <p>Added by {blog?.user?.name}</p>
        {
          login?.username === blog?.user?.username
            ? <Button onClick={() => remove(blog, login)(() => setRemoved(true))} >Remove</Button>
            : null
        }
        <Togglable buttonLabel='Add comment'>
          <CommentForm 
						comment={comment} 
						handleSubmit={
							(event) => { 
								event.preventDefault()
								handleSubmit(constructComment(comment, blog), login, () => comment.setValue('')) 
							}
						}
					/>
        </Togglable>
        <h3>Comments</h3>
        <List divided relaxed>
          {
            comments.length
              ? comments.map((b,i) =>
                <List.Item key={i} >
                  <p>{b?.comment}</p><p>by {b?.user?.name} - {b?.timeStamp}</p>
                </List.Item>)
              : <List.Item ><p>No comments yet</p></List.Item>
          }
        </List>
      </main>
    )
  }

  async function like(blog) {
		callWithTryCatchAsync(
			() => likeBlog(blog),
			(exception) => setNotification({ error: `Could not add like: ${exception.message}` })
		)
  }

  function remove(blog, login) {
    if(window.confirm(`Do you want to remove the blog ${blog.title} by ${blog.author}?`)) {
			return (cleanup) => {
				try {
					removeBlog(login.token, blog)
					setNotification({ message: `Blog ${blog.title} by ${blog.author} removed` })
					cleanup()
				} catch (exception) {
					setNotification({ error: `Could not remove the blog: ${exception.message}` })
				}
			}
    }
  }

}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    comments: state.comments,
    login: state.login,
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification,
  getBlogComments,
  addComment
}

Blog.propTypes = {
  login: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  getBlogComments: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)