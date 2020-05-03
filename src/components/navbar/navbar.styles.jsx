import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const NavbarContainer = styled.div`
    width: 100%;
    z-index: 5000;
    border-bottom: 1px solid rgba(18, 18, 18, .2);
    background: #fff;
    position: sticky;
    top: 0;
`

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 120px;
    padding: 22px 25px;
    display: flex;
    align-items: center;
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
`

export const Logo = styled.img`
    width: 100%;
`