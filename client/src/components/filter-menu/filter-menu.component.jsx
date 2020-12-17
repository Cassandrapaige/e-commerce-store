import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCollectionTags, selectFilterMenu} from '../../redux/shop/shop.selectors'

import Checkbox from '../checkbox/checkbox.component'
import FilterContainer from '../filter-container/filter-container.component'

import {FilterMenuContainer, 
        TagsListContainer,
        TagItem
    } from './filter-menu.styles'

import {PRICE_FILTER_DATA,
        GENDER_FILTER_DATA
    } from '../../constants'


const FilterMenu = ({tags, hidden, fetchFilteredCollection}) => {

    const TAGS_FILTER_DATA = [...new Set(tags[0])]

    return (
        <FilterMenuContainer isVisible = {hidden}>
           <TagsListContainer>
            {
                TAGS_FILTER_DATA.map((item, index) => (
                   <TagItem key = {index} onClick = {fetchFilteredCollection}>{item}</TagItem>
                ))
            }
           </TagsListContainer>
            <FilterContainer title = 'Gender'>
            {
                GENDER_FILTER_DATA.map(({id, ...props })=> (
                    <Checkbox {...props} key = {id}/>
                ))
            }
            </FilterContainer>

            <FilterContainer title = 'Shop By Price'>
            {
                PRICE_FILTER_DATA.map(({id, ...props })=> (
                    <Checkbox {...props} key={id}/>
                ))
            }
            </FilterContainer>
        </FilterMenuContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    tags: selectCollectionTags,
    hidden: selectFilterMenu,
})

export default connect(mapStateToProps)(FilterMenu)