import React, {useState, useEffect} from 'react'
import {animated, useSpring, useTransition, config} from 'react-spring'

import {connect} from 'react-redux'
import {selectCollection} from '../../redux/shop/shop.selectors'

import CollectionItem from '../../components/collection-item/collection-item.component'
import FilterMenu from '../../components/filter-menu/filter-menu.component'

import {FilterIconContainer, CollectionItemContainer} from './collection.styles'
import './collection.styles.scss'

const CollectionPage = ({ collection, filterCollection }) => {
    const [isOpen, setIsOpen] = useState(true)    
    const {title, items} = collection
    const [filteredCollection, setFilteredCollection] = useState(items)

    const tags = items.map(el => el.tags).flat(1);
    const tagsFlatMap = [...new Set(tags)]

    const handleClick = (event) => {
        const value = event.target.textContent
        setFilteredCollection(items.filter(item => item.tags.includes(value)))
    }

    const props = useSpring({
        config: config.default,
        transform: isOpen ? 'translateX(-300px)' : 'translateX(0px)',
    })

    return (
    <div className="collection-page">
        <div className="collection-page-header">
            <h2 className="title">{title}</h2>
            <div className="filter-options"  onClick = {() => setIsOpen(!isOpen)}>
                <div className = 'filter-btn'>
                    {isOpen ? 'Show' : 'Hide'} Filters
                    <FilterIconContainer active = {isOpen}></FilterIconContainer>
                </div>
                <div className = 'sort-btn'>
                    Sort By <i class="fas fa-chevron-down"></i>
                </div>
            </div>
        </div>
        <div className="collection-page-container">
            <FilterMenu items = {tagsFlatMap} isVisible = {isOpen} handleClick = {handleClick}/>
            <CollectionItemContainer active = {isOpen}>
                {filteredCollection.map(item => 
                    <CollectionItem key = {item.id} item = {item}/>
                )}
            </CollectionItemContainer>
        </div>
    </div>
)}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state),
})

export default connect(mapStateToProps)(CollectionPage)
