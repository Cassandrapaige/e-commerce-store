import styled, {css} from 'styled-components'
import {Link} from 'react-router-dom'

export const FooterContainer = styled.div`
    display: grid;
    grid-template-columns: 60% 40%;
    background: #111;
    padding: 40px 40px 10px 40px;
`

export const NavigationListsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-bottom: 30px;
`

export const NavigationListContainer = styled.ul`
    list-style-type: none;
`

export const NavigationItem = styled.li`
    color: #8d8d8d;
    padding: 5px 0;
    font-size: 14px;
    text-transform: capitalize;
    cursor: pointer;

    ${props => props.isCapitalized && css`
        font-weight: 700;
        text-transform: uppercase;
        color: #fff;
        font-family: var(--condensed-text);

        &:nth-of-type(1) {
            padding-top: 0;
        }
    `}
`

export const Title = styled.h2`
    color: #fff;
    text-transform: uppercase;
    font-size: 14px;
    padding-bottom: ${props => props.withPadding ? '5' : '0'}px;
    font-family: var(--condensed-text);
`

export const SocialLink = styled(Link)`
    background: #8d8d8d;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: 0 10px;
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

export const SneakyFooter = styled.div`
    display: flex;
    justify-content: space-between;
    aling-items: center;
    width: 100%;
    grid-column: 1/-1;
    text-align: center;
    padding: 20px 0 10px 0;
    border-top: 1px solid rgba(139, 139, 139, .4);

    p, i, a {
        color: #8b8b8b;
        font-size: 12px;
    }
`