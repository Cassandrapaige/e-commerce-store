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
    }
`

const googleSignInStyles = css`
    background: #4285f4;
    color: #fff;
    border: 1px solid #4285f4;

    &:hover {
        background: #fff;
        color: #4285f4;
        border: 1px solid #4285f4;
    }
`

const getButtonStyles = props => {
    return props.isGoogleSignIn ? googleSignInStyles
    : props.inverted ? invertedButtonStyles
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

    ${getButtonStyles}
`