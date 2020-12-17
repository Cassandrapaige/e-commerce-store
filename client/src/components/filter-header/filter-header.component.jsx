import React from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'

import {toggleFillterMenu} from '../../redux/shop/shop.actions'
import { selectFilterMenu } from '../../redux/shop/shop.selectors'

import {FilterIcon} from '../icons/icons.component'

import useScrollPosition from '../../hooks/useScrollPosition'

import {FilterHeaderContainer,
        Title,
        FilterOptionsContainer,
        FilterOption
    } from './filter-header.styles'

const FilterHeader = ({
        title, 
        isFilterMenuHidden,             
        setIsFilterMenuHidden}) => {

    const scrollY = useScrollPosition();

    return (
         <FilterHeaderContainer>
            <Title isPassedTop = {scrollY > 150}>{title}</Title>
            <FilterOptionsContainer>
                <FilterOption onClick = {() => setIsFilterMenuHidden()}>
                    {isFilterMenuHidden ? 'Show' : 'Hide'} Filters
                    <FilterIcon isFilterMenuHidden = {isFilterMenuHidden}></FilterIcon>
                </FilterOption>
            </FilterOptionsContainer>
        </FilterHeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    isFilterMenuHidden: selectFilterMenu
})

const mapDispatchToProps = (dispatch) => ({
    setIsFilterMenuHidden: () => dispatch(toggleFillterMenu())
})

export default connect(mapStateToProps,mapDispatchToProps)(FilterHeader)