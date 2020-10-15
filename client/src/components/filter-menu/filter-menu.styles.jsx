import styled from 'styled-components'

export const FilterMenuContainer = styled.div`
    min-width: 300px;
    background: white;
    padding-right: 30px;
    padding: 0px 30px 50px 50px;
    grid-row: 1/-1;
    grid-column: 1/2;
    transition: all .5s ease;
    opacity: ${({isVisible}) => isVisible ? 0 : 1};
    transform: ${({isVisible}) => isVisible ? 'translateX(-500px)' : 'translateX(0px)'};
    z-index: 1;

    @media(max-width: 1100px) {
        position: fixed;
        display: none;
    }
`

export const TagsListContainer = styled.ul`
    list-style-type: none;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(18, 18, 18, .2);
`
    
export const TagItem = styled.li`
    padding: 6px 0;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    text-transform: capitalize;

    &:hover {
        color: #757575;
    }
`

