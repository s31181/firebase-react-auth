import React, { Component } from 'react'

import { CSSTransitionGroup, CSSTransition } from 'react-transition-group'

const withTransition = Component => {
  class WithTransition extends Component {

    render() {

      return (
        <CSSTransitionGroup
          className="container-wrapper"
          transitionName="robtastic"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          {<Component {...this.props} />}
        </CSSTransitionGroup>
      )
    }
  }
  return WithTransition
}

export default withTransition