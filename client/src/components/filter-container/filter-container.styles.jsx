import styled from 'styled-components'

export const FilterOptionsContainer = styled.div`
    border-bottom: 1px solid rgba(18, 18, 18, .2);
    background: White;
    width: 100%;
`

export const FilterOptionsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 0;
    width: 100%;
`

export const CollapsibleContainer = styled.div`
    max-height: ${props => props.isOpen ? '100vh' : '0px'};
    overflow: hidden;
    transition: max-height .25s ease-in-out;
`

export const FilterOptions = styled.div`
    padding-bottom: ${props => props.isOpen ? '12px' : '0px'};
    transition: all .3s linear;
`