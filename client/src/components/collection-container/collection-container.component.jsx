import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'

import {selectFilterMenu} from '../../redux/shop/shop.selectors'

import {isFilterMenuHidden} from '../../redux/shop/shop.actions'
import {toggleSortByDropdown} from '../../redux/shop/shop.actions'

import FilterMenu from '../../components/filter-menu/filter-menu.component'
import CollectionPreview from '../../components/preview-collection/preview-collection.component'
import FilterHeader from '../../components/filter-header/filter-header.component'

import {CollectionItemContainer, 
        CollectionPageContainer, 
        CollectionContainer} 
        from './collection-container.styles'

const CollectionsContainer = props => {
   
    const {
        isFilterMenuHidden, 
        setIsDropdownHidden, 
        tags, 
        title, 
        children, 
        handleClick,
        history} = props;

    const filterDataByType = event => {
        const value = event.target.textContent;
        history.push(`/shop/filter/${value}`);
    }

    return (
    <CollectionContainer>
        <FilterHeader title = {title} handleClick = {handleClick}/>
        <CollectionPageContainer>
            <FilterMenu items = {tags} fetchFilteredCollection = {filterDataByType}/>
            <CollectionItemContainer isOpen = {isFilterMenuHidden}>
               {children}
            </CollectionItemContainer>
        </CollectionPageContainer>
    </CollectionContainer>
)}

const mapStateToProps = createStructuredSelector({
    isFilterMenuHidden: selectFilterMenu
})

const mapDispatchToProps = dispatch => ({
    setIsDropdownHidden: () => dispatch(toggleSortByDropdown())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer))
