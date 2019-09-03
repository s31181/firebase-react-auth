import React, { Component } from 'react'

import { CSSTransitionGroup } from 'react-transition-group'
import { withAuthorization } from '../Session'

const HomePage = () => (
  <CSSTransitionGroup
  className="container-wrapper"
  transitionName="robtastic"
  transitionAppear={true}
  transitionAppearTimeout={500}
  transitionEnter={false}
  transitionLeave={false}
>
    <div className="home">
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  </CSSTransitionGroup>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage)