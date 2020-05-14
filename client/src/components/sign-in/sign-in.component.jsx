import React, { useState } from 'react'
import {connect} from 'react-redux'

import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/cutom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

import {emailSignInStart,
        googleSignInStart
        } from '../../redux/user/user.actions'

import './sign-in.styles.scss'

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCredentials, setCredentials] = useState({
            email: '', 
            password: ''
        })

    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password)
    }

    const handleChange = event => {
        const { name, value } = event.target;
        
        setCredentials({
            ...userCredentials,
            [name]: value
        })
    }

        return (
            <div className='sign-in'>
                <h2>I already have an account </h2>
                <span>Sign in with you email and password</span>

                <form onSubmit = {handleSubmit}>
                    <FormInput 
                        type = 'email'
                        name = 'email' 
                        value= {email}
                        handleChange = {handleChange}
                        label = 'email'
                        required/>
                    
                    <FormInput 
                        type = 'password'
                        name = 'password' 
                        value= {password}
                        handleChange = {handleChange}
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


const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
      dispatch(emailSignInStart({ email, password }))
  });

export default connect(
    null, 
    mapDispatchToProps
    )(SignIn)