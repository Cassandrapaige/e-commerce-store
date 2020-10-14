import styled from 'styled-components'

export const ImageContainer = styled.img`
    width: 100%;
    object-fit: cover;
    margin-bottom: 15px;
    transition: all .5s ease;
    height: ${props => props.withMargin  ? '390px' : '340px'};
`