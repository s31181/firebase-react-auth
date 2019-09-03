import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AuthUserContext } from '../Session'
import Logo from '../../assets/llt-logo.svg'

// import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'

// class Navigation extends Component {
//     state = {
//         authUser: this.props.authUser
//     }

//     componentDidUpdate(prevProps) {
//         if(this.props.history !== prevProps.history) {
//             console.log(this.props.history)
//         }
//     }

//     render() {

//         const authUser = this.props.authUser
//         console.log(authUser)
//         return(
//             <div>
//                 {authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}
//             </div>
//         )
//     }
// }

const Navigation = () => (
        <AuthUserContext.Consumer>
            { authUser =>
                authUser ? <NavigationAuth className="logged-in" /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
)

const NavigationAuth =() => (
    <div className="navigation signed-in">
        <ul>
            <li>
                <Link to={ROUTES.HOME}><span className="rob">SUPPORT</span>HELPDESK</Link>
            </li>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li>
                {/* <SignOutButton /> */}
                <Link to={ROUTES.LOGOUT}>Log Out </Link>
            </li>
        </ul>
    </div>
)

const NavigationNonAuth = () => (
    <div className="navigation not-authorized">
        <ul className="nonAuth">
            <li>
                <Link to={ROUTES.LANDING}><span className="rob">SUPPORT</span>HELPDESK</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
        </ul>
    </div>
)

export default Navigation