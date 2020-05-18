import styled, {css} from 'styled-components'

export const FilterIconContainer = styled.span`
    display: inline-block;
    width: 20px;
    border-top: 3px solid #333;
    border-bottom: 3px solid #333;
    height: 10px;
    margin-left: 9px;
    position: relative;

    &:before, 
    &:after {
        position: absolute;
        content: '';
        height: 7px;
        width: 2px;
        background: #333;
        transition: all .5s ease;
    }

    &:before {
        top: -5px;
        left: ${props => props.active ? '5px' : '13px'};
    }

    &:after {
        bottom: -5px;
        right: ${props => props.active ? '5px' : '13px'};
    }
}
`

export const CollectionItemContainer = styled.div`
    display: grid;
    width: 100%;
    gap: 10px;
    grid-column: ${props => props.active ? '1/-1' : '2/-1'};
    grid-row: 1/-1;
    grid-template-columns: repeat(3, 1fr);

    & .collection-item {
        margin-bottom: 30px;
        transform: ${props => props.active ? 'scale(1.005)' : 'scale(1)'};
        transition: all .8s ease;
    }
}
`