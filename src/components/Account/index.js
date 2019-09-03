import React, { Component } from 'react'

import { PasswordForgetForm } from '../PasswordForget'
import PasswordChangeForm from '../PasswordChange'
import { AuthUserContext, withAuthorization } from '../Session'

class AccountPage extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
      { authUser => (
        <div>
          <h1>Account: {authUser.uid.nameFirst}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
        </div>
    )}
      </AuthUserContext.Consumer>
    )
  }
}
 const condition = authUser => !!authUser

 export default withAuthorization(condition)(AccountPage)