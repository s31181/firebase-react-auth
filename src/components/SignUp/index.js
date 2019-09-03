import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

// importing the firebase context
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'
import signUpIMG from '../../assets/signup.svg'

// This will be the sign up page - just general mark-up ** THe FirebaseContext Component is coming in from firebase via the React Context API

const SignUpPage = () => (
    <div className="sign-up-page">
        <h1>Sign Up</h1>
        <SignUpForm />
        <img src={signUpIMG} alt=""/>
    </div>
)

const INITIAL_STATE = {
    username: '',
    nameFirst: '',
    nameLast: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null
}

class SignUpFormBase extends Component {
    state = { ...INITIAL_STATE }

    // once the sign up form has been validated - the request to make a user, with user info will be sent to firebase.
    onSubmit = event => {
        // sets the state to the constants
        // const { username, email, passwordOne } = this.state;

        // brings in the firebase methods
        // create user with the email and password
        const { username, nameFirst, nameLast, isAdmin, email, passwordOne } = this.state;

        const roles = {};

        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            // sets the user to replace the initial state
            .then(authUser=> {
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        nameFirst,
                        nameLast,
                        isAdmin,
                        email,
                        roles
                    })
            })
            .then(() => {
                this.setState({...INITIAL_STATE })
                this.props.history.push(ROUTES.HOME)
            })
            // if there is an error while authorizing the user it will set the error messages to state
            .catch(error => {
                this.setState({ error })
            })

            // so it doesn't reload the page
            event.preventDefault();
    }

    onChange = event => {
        // updates local state
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onChangeCheckbox = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {
            username,
            nameFirst,
            nameLast,
            email,
            passwordOne,
            passwordTwo,
            isAdmin,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            nameFirst === '' ||
            nameLast === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="nameFirst"
                    type="text"
                    value={nameFirst}
                    onChange={this.onChange}
                    placeholder="First Name"
                />
                <input
                    name="nameLast"
                    type="text"
                    value={nameLast}
                    onChange={this.onChange}
                    placeholder="Last Name"
                />
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="username"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                  <label>
                    Admin:
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                    />
                </label>
                <button disabled={isInvalid} type="submit">
                    Sign Up
                </button>

                {/* below is a line that displays an error mesage if there is one returning. */}
                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase)

export default SignUpPage

export { SignUpForm, SignUpLink };