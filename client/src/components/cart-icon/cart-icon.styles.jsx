import styled from 'styled-components'

export const CartIconContainer = styled.div`
width: 45px;
height: 45px;
position: relative;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
padding-left: 25px;

.fa-shopping-cart {
    position: relative;
    color: ${props => props.isMobile ? '#333' : '#757575'};
    font-size: 16px;
}
`

export const ItemCount = styled.span`
position: absolute;
font-size: 10px;
font-weight: bold;
top: 7px;
right: -3px;
background: #FA5400;
border-radius: 50%;
height: 15px;
width: 15px;
display: flex;
justify-content: center;
align-items: center;
color: #fff;
`