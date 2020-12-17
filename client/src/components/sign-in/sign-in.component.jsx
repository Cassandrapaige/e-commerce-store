import React, { useState } from 'react'
import {connect} from 'react-redux'
import {animated, useTransition, config} from 'react-spring'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/cutom-button.component'

import {SignInContainer, 
        SignInHeader,
        UserConditionsContainer,
        UserConditionsHeader,
        Text,
        ActionLink,
        SignInForm} from './sign-in.styles'

import {emailSignInStart,
        googleSignInStart} from '../../redux/user/user.actions'

import './sign-in.styles.scss'
import Logo from '../logo-container/logo-container.component'
import Checkbox from '../checkbox/checkbox.component'
import BackgroundOverlay from '../background-overlay/background-overlay.component'

const SignIn = ({emailSignInStart, googleSignInStart, setHidden, hidden, invertedCheckbox}) => {
    const [isUser, setIsUser] = useState(true)
    const [userCredentials, setCredentials] = useState({
            email: '', 
            password: ''
        })

    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
        setHidden(false)
        setIsUser(true)
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
        duration: 500,
        from: {opacity: 0},
        enter: {
            opacity: 1,
            zIndex: 50000,
            position: 'fixed'
        },
        leave: {opacity: 0}
    })

    return transitions.map(({ item, props}) => item && (
        <animated.div style = {props}>
            <SignInContainer>
            <SignInForm hidden = {hidden}>
                
                <SignInHeader>
                    <Logo small/>
                    <h2>Your account for everything Nike</h2>
                </SignInHeader>

        {
            isUser ? 

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

                    <CustomButton
                        type='button'
                        onClick={googleSignInStart}
                        isGoogleSignIn
                    >
                        Sign in with Google
                    </CustomButton>
        
                    <div className="link-to-sign-up">
                        <Text centered>Not a member? <ActionLink cta onClick = {() => setIsUser(false)}>Join Us.</ActionLink></Text>
                    </div>
                </form>
            :
            <div>
            <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit = {handleSubmit}>
                    <FormInput
                        type = 'text'
                        name = 'displayName'
                        value= { email }
                        onChange = { handleChange }
                        label= 'Display Name'
                        required
                    />
                    <FormInput
                        type = 'email'
                        name = 'email'
                        value= { email }
                        onChange = { handleChange }
                        label= 'Email'
                        required
                    />
                    <FormInput
                        type = 'password'
                        name = 'password'
                        value= { password }
                        onChange = { handleChange }
                        label= 'Password'
                        required
                    />
                    <FormInput
                        type = 'password'
                        name = 'confirmPassword'
                        value= { password }
                        onChange = { handleChange }
                        label= 'Confirm Password'
                        required
                    />
                    <CustomButton type = 'submit'>Sign Up</CustomButton>
                </form>
                </div>
        }
            </SignInForm>
            </SignInContainer>
            <BackgroundOverlay fixedTop handleClick = {() => {setHidden(false); setIsUser(true)}}/>
        </animated.div>
        )
    )}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({ email, password }))
  });

export default connect(null, mapDispatchToProps)(SignIn)