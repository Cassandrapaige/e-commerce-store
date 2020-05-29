import styled from 'styled-components'

export const ArrowIconContainer = styled.div`
    width: 1rem;
    height: 1.25rem;
    position: relative;
    margin-left: 5px;
    z-index: 1000;

    span {
        width: 10px;
        height: 2px;
        background: #333;
        display: inline-block;
        position: absolute;
        top: .6rem;
        transition: all .3s ease;

        &:first-of-type {
            left: 0;
            transform: ${props => props.isDropdownHidden ? 'rotate(45deg)' : 'rotate(-45deg)'};
        }

        &:last-of-type {
            right: 0;
            transform: ${props => props.isDropdownHidden ? 'rotate(-45deg)' : 'rotate(45deg)'};
        }
    }
`

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
        transition: all .3s ease;
    }

    &:before {
        top: -5px;
        left: ${props => props.isFilterMenuHidden ? '5px' : '13px'};
    }

    &:after {
        bottom: -5px;
        right: ${props => props.isFilterMenuHidden ? '5px' : '13px'};
    }
}
`