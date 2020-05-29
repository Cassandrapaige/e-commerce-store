import styled, {css} from 'styled-components'
import {Link} from 'react-router-dom'

export const FooterContainer = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    background: #111;
    padding: 40px;
`

export const NavigationListsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`

export const NavigationListContainer = styled.ul`
    list-style-type: none;
`

export const NavigationItem = styled.li`
    color: #8d8d8d;
    padding: 5px 0;
    font-size: 14px;
    text-transform: capitalize;

    ${props => props.isCapitalized && css`
        font-weight: 700;
        text-transform: uppercase;
        color: #fff;
        font-family: 'Open Sans Condensed', sans-serif;
    `}
`

export const Title = styled.h2`
    color: #fff;
    text-transform: uppercase;
    font-size: 14px;
    padding-bottom: 5px;
    font-family: 'Open Sans Condensed', sans-serif;
`

export const SocialLink = styled(Link)`
    background: #8d8d8d;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: 10px;
    opacity: .9;

    i {
        color: #111;
    }
`

export const ContactLinksContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`