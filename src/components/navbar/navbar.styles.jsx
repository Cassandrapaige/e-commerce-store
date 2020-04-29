import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const NavbarContainer = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    z-index: 5000;
    font-weight: 800;
    border-bottom: 1px solid #000;
    background: #fff;
`

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 120px;
    padding: 25px;
    display: flex;
    align-items: center;
`

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`

export const Logo = styled.img`
    width: 50%;
`