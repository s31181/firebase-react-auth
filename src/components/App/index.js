import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin'
import SignOut from '../SignOut';
import { CSSTransition } from 'react-transition-group'

// NOTE****** AuthUserContext removed because its used in the userAuthentication HOC
// import { AuthUserContext } from '../Session'

import * as ROUTES from '../../constants/routes'
// NOTE***** The withFirebase component was replaced with the withAuthentication component this is because withAuthentication Higher Order Component uses withFirebase as well.
// import { withFirebase } from '../Firebase'
import { withAuthentication } from '../Session'

class App extends Component {

  render() {
    return (
      <Router>
          <div className="app-wrap">
            <div className="nav-wrap">
              <Navigation />
            </div>

            <div className="router-wrap container">
              <Route exact
                path={ROUTES.LANDING}
                component={LandingPage}
              />
              <Route
                path={ROUTES.SIGN_UP}
                component={SignUpPage}
              />
              <Route
                path={ROUTES.SIGN_IN}
                component={SignInPage}
              />
              <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
              <Route
                path={ROUTES.HOME}
                component={HomePage}
              />
              <Route
                path={ROUTES.ACCOUNT}
                component={AccountPage}
              />
              <Route
                path={ROUTES.ADMIN}
                component={AdminPage}
              />
              <Route
                path={ROUTES.LOGOUT}
                component={SignOut}
              />
            </div>
          </div>
      </Router>
    )
  }
}

export default withAuthentication(App)