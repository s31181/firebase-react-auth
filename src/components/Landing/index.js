import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withTransition } from '../Transition'

import * as ROUTES from '../../constants/routes'

import Img from '../../assets/home.svg'

class Landing extends Component {

    state = {
      unMounting: false
    }


  render() {
    return (
      <div className="landing-wrap">
        <div className="title">
            <span className="green">Welcome To</span>
            <h1>Support Helpdesk</h1>
        </div>
        <div className="landing-info">
          <h2>Support Helpdesk is an easy way for our clients to reach out to our support team if they have an questions or need our help. </h2>

          <p className="info-sub-header">At Support Helpdesk you can...</p>
          <ul>
            <li>Check Your Current Support Hours</li>
            <li>See Current/Pending Tickets</li>
            <li>Submit New Requests</li>
          </ul>
            <div className="login-header">
              <p>To access your account sign in. <br/>If you don't have an account please register.</p>
              <div className="link-cta">
                <Link className="button" to={ROUTES.SIGN_IN}>Sign In</Link>
                <Link className="button" to={ROUTES.SIGN_UP}>Register</Link>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default withTransition(Landing)