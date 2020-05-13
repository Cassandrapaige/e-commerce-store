import React, { Component } from 'react'
import {connect} from 'react-redux'

import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/cutom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

import {emailSignInStart,
        googleSignInStart
        } from '../../redux/user/user.actions'

import './sign-in.styles.scss'

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    } 

    handleSubmit = async event => {
        event.preventDefault();
        const {emailSignInStart} = this.props;
        const { email, password} = this.state;

        emailSignInStart(email, password)
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { googleSignInStart } = this.props;

        return (
            <div className='sign-in'>
                <h2>I already have an account </h2>
                <span>Sign in with you email and password</span>

                <form onSubmit = {this.handleSubmit}>
                    <FormInput 
                        type = 'email'
                        name = 'email' 
                        value= {this.state.email}
                        handleChange = {this.handleChange}
                        label = 'email'
                        required/>
                    
                    <FormInput 
                        type = 'password'
                        name = 'password' 
                        value= {this.state.password}
                        handleChange = {this.handleChange}
                        label = 'password'
                        required/>

                    <CustomButton type= 'submit'>
                        Sign In
                    </CustomButton>
                    <CustomButton type= 'button' onClick = { googleSignInStart } isGoogleSignIn>
                        Sign In With Google
                    </CustomButton>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
      dispatch(emailSignInStart({ email, password }))
  });

export default connect(
    null, 
    mapDispatchToProps
    )(SignIn)