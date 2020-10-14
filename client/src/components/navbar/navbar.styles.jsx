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

export const UpperNavbar = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
border-bottom: 1px solid rgba(18, 18, 18, .2);
font-size: 12px;

a, div, .fas {
    color: #757575;
}

@media(max-width: 1100px) {
    display: none;
}
`

export const LowerNavbar = styled.div`
display: flex;
align-items: center;
justify-content: space-between;

@media(max-width: 1100px) {
    display: none;
}
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

export const HamburgerIconContainer = styled.div`
width: 35px;
height: 18px;
border-radius: 50%;
position: relative;
margin: 0 20px;
`

export const HamburgerIconTop = styled.span`
position: absolute;
width: 70%;
height: 2px;
background: #111;
left: 50%;
transform: translateX(-50%);
top: 0%;
`

export const HamburgerIconBottom = styled(HamburgerIconTop)`
top: unset;
bottom: 0;
`

export const HamburgerIconMiddle = styled(HamburgerIconTop)`
top: 50%;
transform: translate(-50%, -50%);
`

export const MobileNavbar = styled.div`
display: none;

@media(max-width: 1100px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
`

export const MobileIcons = styled.div`
display: flex;
align-items: center;
`