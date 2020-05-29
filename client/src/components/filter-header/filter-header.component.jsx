import React, {useState, useEffect} from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'

import {toggleFillterMenu, toggleSortByDropdown} from '../../redux/shop/shop.actions'
import { selectFilterMenu, selectSortByDropdown } from '../../redux/shop/shop.selectors'

import {ArrowIcon, FilterIcon} from '../icons/icons.component'

import {FilterHeaderContainer,
        Title,
        FilterOptionsContainer,
        FilterOption,
        SortDropdownContainer
    } from './filter-header.styles'

const FilterHeader = ({
        title, handleClick, 
        isFilterMenuHidden,             
        isDropdownHidden, 
        setIsDropdownHidden, 
        setIsFilterMenuHidden}) => {

    const [isPassedTop, setIsPassedTop] = useState(false)

    const addStylesOnPageScroll = () => {
        if(window.pageYOffset > 150) {
            setIsPassedTop(true)
        } else {
            setIsPassedTop(false)
        }
    }
    
    useEffect(() => {
        window.addEventListener('scroll', addStylesOnPageScroll);
        return () => window.removeEventListener('scroll', addStylesOnPageScroll)
    }, [])

    return (
         <FilterHeaderContainer>
            <Title isPassedTop = {isPassedTop}>{title}</Title>
            <FilterOptionsContainer>
                <FilterOption onClick = {() => setIsFilterMenuHidden()}>
                    {isFilterMenuHidden ? 'Show' : 'Hide'} Filters
                    <FilterIcon isFilterMenuHidden = {isFilterMenuHidden}></FilterIcon>
                </FilterOption>
                <FilterOption 
                    onClick = {() => setIsDropdownHidden()}
                    isDropdownHidden = {isDropdownHidden}>
                    Sort By 
                    <ArrowIcon isDropdownHidden = {isDropdownHidden} />
                </FilterOption>
            </FilterOptionsContainer>
            <SortDropdownContainer isDropdownHidden = {isDropdownHidden}>
                <span data-type='high' onClick = {handleClick}>Price: High-Low</span>
                <span data-type='low' onClick = {handleClick}>Price: Low-High</span>
            </SortDropdownContainer>
        </FilterHeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    isFilterMenuHidden: selectFilterMenu,
    isDropdownHidden : selectSortByDropdown
})

const mapDispatchToProps = dispatch => ({
    setIsFilterMenuHidden: () => dispatch(toggleFillterMenu()),
    setIsDropdownHidden: () => dispatch(toggleSortByDropdown())
})

export default connect(mapStateToProps,mapDispatchToProps)(FilterHeader)