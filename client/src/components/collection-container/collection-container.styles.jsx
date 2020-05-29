import styled, {css} from 'styled-components'

export const CollectionPageContainer = styled.div`
display: grid;
grid-template-columns: 300px 1fr;

@media (max-width: 1000px) {   
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}
`

export const CollectionItemContainer = styled.div`
    margin-left: ${props => props.isOpen ? '0px' : '300px'};
    gap: 10px;
    transition: all 2.4s ease;
    grid-column: 1/-1;
    grid-row: 1/-1;
    transition: all .5s ease;

    @media(max-width: 1100px) {
        position: absolute;
        margin-left: 0;
    }
`

export const CollectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`
