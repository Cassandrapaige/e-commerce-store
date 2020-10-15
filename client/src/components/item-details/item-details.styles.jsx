import styled from 'styled-components'

export const ImageContainer = styled.img`
    width: 100%;
    object-fit: cover;
    margin-bottom: 15px;
    transition: all .5s ease;
    height: ${({withMargin}) => withMargin  ? '390px' : '340px'};

    @media(max-width: 700px) {
        height: 200px;
        object-fit: cover;
    }
`