import React, { Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { compose } from 'recompose'

import { withTransition } from '../Transition'
import Login from '../../assets/signIn.svg'

import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
import { withFirebase} from '../Firebase'
import * as ROUTES from '../../constants/routes'

// const SignInPage = () => (
//     <div>
//         <h1>Sign In</h1>
//         <SignInForm />
//         <SignUpLink />
//     </div>
// )

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

class SignInPage extends Component {


    componentDidMount() {
        window.scrollTo(0, 0);
    }


    render() {

            return (
                <div className="sign-in-wrapper">
                <div className="sign-in-body">
                <div className="signIn-left">
                    <Link className="logo-wrap" to={ROUTES.LANDING}><p className="logo"><span className="rob">SUPPORT</span>HELPDESK</p></Link>
                </div>
                <div className="signIn-right">
                <img className="login-img" src={Login} alt="login"/>
                    <div className="sign-in-form">


                        <SignInForm />
                        <PasswordForgetLink />
                        <SignUpLink />
                    </div>
                </div>
                </div>
                </div>
            )
        }
    }


class SignInFormBase extends Component {
    state = { ...INITIAL_STATE }

    onSubmit = event => {
        const {email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
                console.log(this.props.history)
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({error})
            })
            event.preventDefault()
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value})
    }

    render() {
        const {email, password, error } = this.state

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div className="form-wrapper">
                <form onSubmit={this.onSubmit} >
                    <div className="form-login-part">
                        <input
                            name='email'
                            value={email}
                            onChange={this.onChange}
                            type="text"
                            plaeholder="Email Address"
                        />
                        <label htmlFor="email">Username</label>
                    </div>
                    <div className="form-login-part">
                        <input
                            name='password'
                            value={password}
                            onChange={this.onChange}
                            type="password"
                            plaeholder="Password"
                        />
                    <label htmlFor="password">Password</label>
                    </div>
                    <button disabled={isInvalid} type="submit">
                        Sign In
                    </button>
                        {error && <p>{error.message}</p>}
                </form>
            </div>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default withTransition(SignInPage)

export {SignInForm}