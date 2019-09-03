import React from 'react'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

import { Redirect } from 'react-router-dom'

class SignOutButton extends React.Component {

    state = {
        redirect: false
    }

    // setRedirect = () => {
    //     console.log(`setRedirect has run`)
    //     this.setState({
    //         redirect: true
    //     })
    // }

    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //         console.log(`what the Juan`)
    //         return <Redirect to='/' />
    //     }
    // }

    // onClick = event => {
    //     console.log(`click happens`)
    //     this.props.firebase.doSignOut();
    // }

    // componentDidUpdate() {
    //     this.setState({
    //         redirect: true
    //     })
    // }
    componentDidMount() {
        setTimeout(() => {
            this.props.firebase.doSignOut().then(() => {
                this.setState({redirect: true});
            })
        }, 5000)
    }
    render() {

        if (this.state.redirect === true) {
            return <Redirect to={ROUTES.LANDING} />
          }

        return (
            <div>
                <img src="https://media.giphy.com/media/eQyPiQGIkaQSI/giphy.gif" alt=""/>
                <h3>Logging Out</h3>
            </div>
        )
    }
}

export default withFirebase(SignOutButton)