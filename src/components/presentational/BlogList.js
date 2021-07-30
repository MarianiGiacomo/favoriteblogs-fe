import React from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { Table } from 'semantic-ui-react'

import { filterBlogs } from 'Lib'

const BlogList = (props) => {
  const { blogs, login } = props

  return (
    <>
      <h2>Your blogs</h2>
			<div>
      { filterBlogs(blogs, login).length
        ?
        <Table striped celled >
          <Table.Body>
            {filterBlogs(blogs, login).sort((a, b) => a.likes - b.likes).map((blog, i) =>
              <Table.Row key={i}>
                <Table.Cell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        :
        <p>You don&apos;t have any blogs yet</p>
      }
			</div>
      <h2>All blogs</h2>
      { blogs.length
        ?
        <Table striped celled >
          <Table.Body>
            {
              blogs.sort((a, b) => a.likes - b.likes).map((blog, i) =>
                <Table.Row key={i}>
                  <Table.Cell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </Table.Cell>
                </Table.Row>
              )}
          </Table.Body>
        </Table>
        :
        <p>There are no blogs yet</p>
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    login: state.login,
  }
}

BlogList.propTypes = {
  login: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  null
)(BlogList)