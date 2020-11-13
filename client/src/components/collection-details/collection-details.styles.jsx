import styled from 'styled-components'

export const ImageContainer = styled.img`
    width: 100%;
    object-fit: cover;
    height: 550px;

    @media(max-width: 800px) {
        height: 250px;
    }
`
