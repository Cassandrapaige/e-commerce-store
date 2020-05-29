import styled, {css} from 'styled-components'
import {Link} from 'react-router-dom'

export const SignInContainer = styled.div`
    width: 380px;   
    display: flex;
    flex-direction: column;
    background: white;
    transition: all .5s ease;
    padding: 0 10px;
    transform: ${props => !props.hidden ? 'translateY(50px)' : 'translateY(0px)'}
`

export const SignInHeader = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    align-items: center;

    h2 {
        text-transform: uppercase;
        margin-bottom: 28px;
    }
`

export const UserConditionsContainer = styled.div`
    display: block;
    padding: 20px 0;
`

export const UserConditionsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
        color: #8d8d8d;
        font-size: 12px !important;
    }
`

export const Text = styled.p`
    color: #8d8d8d;
    font-size: 13px;

    ${props => props.centered && css`
        text-align: center;
        padding: 15px 25px;
        line-height: 20px;
    `}
`

export const ActionLink = styled(Link)`
    cursor: pointer;
    color: #8d8d8d;
    text-decoration: underline;

    ${props => props.cta && css`
        color: #000;
    `}
`