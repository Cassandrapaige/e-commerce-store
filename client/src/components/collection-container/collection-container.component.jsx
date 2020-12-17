import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'

import {selectFilterMenu} from '../../redux/shop/shop.selectors'

import FilterMenu from '../../components/filter-menu/filter-menu.component'
import FilterHeader from '../../components/filter-header/filter-header.component'

import {CollectionItemContainer, 
        CollectionPageContainer, 
        CollectionContainer} 
        from './collection-container.styles'

const CollectionsContainer = props => {
   
    const {
        isFilterMenuHidden, 
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
        <FilterHeader title = {title} handleClick = {handleClick} />
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

export default withRouter(connect(mapStateToProps)(CollectionsContainer))
