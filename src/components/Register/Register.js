import React from 'react'
import './Register.css'
import axios from 'axios'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signInName: '',
            signInEmail: '',
            signInPassword: ''
        }
    }
    onNameChange = (event) => {
        this.setState({signInName:event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({signInEmail:event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword:event.target.value})
    }

    onSubmitSignUp = () => {
        console.log(this.state)
        axios.post('https://protected-hamlet-43340.herokuapp.com/register', {
            name: this.state.signInName,
            email: this.state.signInEmail,
            password: this.state.signInPassword
        })
        .then(response => {
            this.props.loadUser(response.data)
            this.props.onRouteChange('home')
            console.log(response.data)
        })
        .catch(error => alert("Oops! Something went wrong."))
    }

    render() {
        //const { onRouteChange } = this.props
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={ this.onNameChange}
                                />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={ this.onEmailChange}
                                />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={ this.onPasswordChange}
                                />
                    </div>
                    </fieldset>
                    <div className="">
                            <input
                                onClick={ ()=>this.onSubmitSignUp()}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register" />
                    </div>
                </div>
                </main>
            </article>
        )
    }
}

export default Register