import styled, {css} from 'styled-components'

export const FilterHeaderContainer = styled.div`
    position: sticky;
    top: 110px;
    background: white;
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 1000;
`

export const Title = styled.h2`
    transition: all .3s ease;
    font-size: ${props => props.isPassedTop ? '22px' : '28px'};
    font-weight:500;
    padding: ${props => props.isPassedTop ? '22px 0' : '25px 0'};
    text-transform: capitalize;
`
 
export const FilterOptionsContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    background: white;
`

export const FilterOption = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 20px;
    height: 100%;

    .fas {
        padding-left: 8px;
        transition: all .5s ease;
        transform: ${props => props.isFilterMenuHidden ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
`

export const SortDropdownContainer = styled.div`
    position: absolute;
    top: 55px;
    right: -10px;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 30px 10px;
    border-radius: 0 0 20px 20px;
    transition: all .3s ease;
    z-index: 900;
    transform: 'translateY(0px)';
    opacity: 1;
    visibility: visible;
    text-align: right;  
    
    span {
        padding: 5px 0;
        cursor: pointer;

        &:hover {
            color: #757575;
        }
    }

    ${props => props.isDropdownHidden && css`
        transform: translateY(-100px);
        opacity: 0;
        visibility: hidden;
    `}
`