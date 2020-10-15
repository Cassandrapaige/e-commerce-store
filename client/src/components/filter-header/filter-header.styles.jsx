import styled, {css} from 'styled-components'

export const FilterHeaderContainer = styled.div`
    position: sticky;
    top: 110px;
    background: white;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    z-index: 1000;
    padding: 10px 50px;

    @media(max-width: 1100px) {
        padding: 10px 10px;
        top: 40px;
      }
`

export const Title = styled.h2`
    transition: all .3s ease;
    font-size: ${({isPassedTop}) => isPassedTop ? '22px' : '28px'};
    padding: ${({isPassedTop})  => isPassedTop ? '22px 0' : '25px 0'};
    font-weight:500;
    text-transform: capitalize;

    @media(max-width: 800px) {
        font-size: 20px;
        padding: 10px 0;
    }
`
 
export const FilterOptionsContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    background: white;
    z-index: 1000;
`

export const FilterOption = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;

    &:nth-of-type(2) {
        margin-left: 20px;
    }

    .fas {
        padding-left: 8px;
        transition: all .5s ease;
        transform: ${({isFilterMenuHidden}) => isFilterMenuHidden ? 'rotate(180deg)' : 'rotate(0deg)'};
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
    z-index: 20;
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