import styled, {css} from 'styled-components'

const buttonStyles = css`
    background: black;
    color: white;
    border: 1px solid black;

    &:hover {
        background: white;
        color: black;
        border: 1px solid black;
    }
`

const invertedButtonStyles = css`
    background: white;
    color: black;
    border: 1px solid black;

    &:hover {
        background: black;
        color: white;

        .far {
            color: #fff;
        }
    }
`

const googleSignInStyles = css`
    background: #fff;
    color: #4285f4;
    border: 1px solid #4285f4;
    border-radius: 5px;
    width: 100%;
    padding: 12px;

    &:hover {
        background: #4285f4;
        color: #fff;
        border: 1px solid #4285f4;
    }
`

const signInButtonStyles = css`
    border-radius: 5px;
    width: 100%;
    padding: 12px;
    background: #000;
    border: 1px solid black;
    color: #fff;
    margin-bottom: 10px;
`

const getButtonStyles = props => {
    return props.isGoogleSignIn ? googleSignInStyles
    : props.inverted ? invertedButtonStyles
    : props.signInButtonStyles ? signInButtonStyles
    : buttonStyles
}

export const CustomButtonContainer = styled.button`
    letter-spacing: .5px;
    padding: 20px;
    font-size: 15px;
    border: 1px solid black;
    text-transform: uppercase;
    font-weight: bolder;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    border-radius: 50px;
    z-index: 100;

    ${getButtonStyles}
`