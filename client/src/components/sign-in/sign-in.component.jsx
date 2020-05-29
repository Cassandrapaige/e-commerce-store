import React, { useState } from 'react'
import {connect} from 'react-redux'
import {animated, useSpring, useTransition, config} from 'react-spring'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/cutom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

import {SignInContainer, 
        SignInHeader,
        UserConditionsContainer,
        UserConditionsHeader,
        Text,
        ActionLink} from './sign-in.styles'

import {emailSignInStart,
        googleSignInStart} from '../../redux/user/user.actions'

import './sign-in.styles.scss'
import Logo from '../logo-container/logo-container.component'
import Checkbox from '../checkbox/checkbox.component'
import BackgroundOverlay from '../background-overlay/background-overlay.component'

const SignIn = ({emailSignInStart, googleSignInStart, setHidden, hidden, invertedCheckbox}) => {
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

    const transitions = useTransition(hidden, null, {
        config: config.default,
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0}
    })

    return transitions.map(({ item, props}) => item && (
        <animated.div style = {props}>
            <div className="sign-in-container">
            <SignInContainer hidden = {hidden}>
                <SignInHeader>
                    <Logo small/>
                    <h2>Your account for everything Nike</h2>
                </SignInHeader>

                <form onSubmit = {handleSubmit}>
                    <FormInput 
                        type = 'email'
                        name = 'email' 
                        value= {email}
                        handleChange = {handleChange}
                        placeholder = 'Email address'
                        required/>
                    
                    <FormInput 
                        type = 'password'
                        name = 'password' 
                        value= {password}
                        handleChange = {handleChange}
                        placeholder = 'Password'
                        required/>

                    <UserConditionsContainer>
                        <UserConditionsHeader>
                            <Checkbox inverted label = 'Keep me signed in'/>
                            <Text>Forgotten your password?</Text>
                        </UserConditionsHeader>
                        <Text centered>By logging in, you agree to Nike's <ActionLink>Privacy Policy</ActionLink> and <ActionLink>Terms of Use</ActionLink></Text>
                    </UserConditionsContainer>

                    <CustomButton type= 'submit' signInButtonStyles>
                        Sign In
                    </CustomButton>
        
                    <div className="link-to-sign-up">
                        <Text centered>Not a member? <ActionLink cta>Join Us.</ActionLink></Text>
                    </div>
                </form>
            </SignInContainer>
            </div>
            <BackgroundOverlay fixedTop handleClick = {() => setHidden(false)}/>
        </animated.div>
        )
    )}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
      dispatch(emailSignInStart({ email, password }))
  });

export default connect(
    null, 
    mapDispatchToProps
    )(SignIn)