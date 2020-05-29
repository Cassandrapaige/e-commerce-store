import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const NavbarContainer = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(18, 18, 18, .2);
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 1200;
`

export const OptionsContainer = styled.div`
    height: 100%;
    font-weight: 800;
    font-size: 16px;
    margin-left: -125px;
`

export const OptionLink = styled(Link)`
    padding: 10px 25px;
    cursor: pointer;
    letter-spacing: 1px;
    font-family: ${props => props.isCollection && "'Open Sans Condensed', sans-serif"};
`