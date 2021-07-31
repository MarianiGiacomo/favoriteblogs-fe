import React from "react"

import { PropTypes } from 'prop-types'
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { Table } from 'semantic-ui-react'

import { populateWithBlogs } from 'Lib'

const UserList = (props) => {
  const { users, blogs } = props

  return (
		<>
      <h1 aria-live="polite">Users</h1>
			<main>
				<Table striped celled >
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Blogs created</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{ populateWithBlogs(users, blogs).map((user, i) =>
							<Table.Row key={i}>
								<Table.Cell>
									<Link to={`/users/${user.id}`}>{user.name}</Link>
								</Table.Cell>
								<Table.Cell>{user.blogs.length}</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table>
     </main>
		</>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  null
)(UserList)