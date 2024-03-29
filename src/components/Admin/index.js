import React, { Component } from 'react'

// import { withAuthorization } from '../Sessions'
import { withFirebase } from '../Firebase'
import * as ROLES from '../../constants/roles'
import { withAuthorization } from '../Session/index';

class AdminPage extends Component {

  state = {
    loading: false,
    users: []
  }

  componentDidMount() {
    this.setState({
      loading: true
    })

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val()

      const usersList = Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key,
        })
      )

      this.setState({
        users: usersList,
        loading: false
      })
    })
  }

  componentWillUnmount() {
    this.props.firebase.users().off()
  }



  render() {

    const { users, loading } = this.state

    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading - Lunch Party ... (ITS SUPPOSE TO SAY LAUNCH PARTY!</div>}

        <UserList users={users} />
      </div>
    )
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
)

const condition = authUser =>
authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AdminPage)