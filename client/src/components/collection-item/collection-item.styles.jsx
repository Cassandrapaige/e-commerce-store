import styled from 'styled-components'

export const CollectionItemContainer = styled.div`
    position: relative;
    padding: 5px;
    background: #fff;
    width: 100%;
    margin-bottom: 20px;
    z-index: 1;
`

export const ImageContainer = styled.img`
    width: 100%;
    object-fit: cover;
    margin-bottom: 15px;
    transition: all .5s ease;
    height: ${props => props.withMargin  ? '390px' : '340px'};

    @media (max-width: 1100px) {
        height: auto;
    }
`

export const ImageGridContainer = styled.div`
    width: 100%;
    margin-top: 8px;  
    display: flex;
    align-items: center;
`

export const ImagePreviewContainer = styled.div`
    height: 60px;
    display: flex;

    @media (max-width: 600px) {
        display: none;
     }
`

export const Image = styled.img`
    width: 39px;
    margin: 0 2px;
`

export const CollectionItemFooter = styled.div`

@media (max-width: 1000px) {
    padding: 0 10px;
}

@media (max-width: 500px) {
    font-size: 13px;
}
`