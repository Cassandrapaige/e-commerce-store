import styled from 'styled-components'

export const HeaderContainer = styled.header`
height: 650px;
overflow: hidden;
position: relative;
margin-bottom: 50px;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
width: 100%;
margin: auto;
z-index: 1;
opacity: 0;
animation: .5s fadeIn ease forwards .5s;

button {
    width: 200px;
    border: none;
}

@media (max-width: 1100px) {
    height: 70vh;
}
`

export const HeaderOverlay = styled.div`
display: flex;
height: 100%;
width: 100%;
justify-content: flex-end;
align-items: start;
flex-direction: column;
padding: 50px;
background: linear-gradient(to top, rgba(19, 19, 19, .3), rgba(19, 19, 19, .1));

@media (max-width: 1100px) {
    padding: 30px;
}

@media(max-width: 1100px) {
    padding: 10px;
}
`

export const TitleSpan = styled.span`
font-size: 18px;
color: #fff;
`

export const Title = styled.h1`
color: #fff;
font-size: 8vmax;
width: 60%;
line-height: 80%;
padding: 10px 0 30px 0;

@media (max-width: 1100px) {
    width: 80%;
    padding: 10px 0 20px 0;
}
`