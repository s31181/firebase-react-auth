import React, { Component } from 'react'
import AuthUserContext from './context'
import withAuthentication from './withAuthentication'
import withAuthorization from './withAuthorization'

export default class Session extends Component {
  render() {
    return (
      <div>
        This is Session
      </div>
    )
  }
}

export { AuthUserContext, withAuthentication, withAuthorization }