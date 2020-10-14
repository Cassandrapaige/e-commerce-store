import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const LogoContainer = styled(Link)`
    height: 100%;
    width: ${props => props.small ? '90px' : '120px'};
    padding: 22px 25px;
    display: flex;
    align-items: center;

    @media(max-width: 1100px) {
        width: 90px;
        padding: 10px 20px;
    }
`

export const LogoImage = styled.img`
    width: 100%;
`