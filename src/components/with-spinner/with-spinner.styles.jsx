import styled from 'styled-components'

export const SpinnerOverlay = styled.div`
 height: 60vh;
 width: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
`

export const SpinnerContainer = styled.div`
    display: inline-block;
    background: black;
    width: 50px;
    height: 50px;
    borer: 3px solid rgba(195, 195, 195, .6);
    border-top-color: red;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;

    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
`