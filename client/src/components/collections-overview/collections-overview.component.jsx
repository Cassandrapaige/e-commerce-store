import React from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../preview-collection/preview-collection.component'

import CustomButton from '../custom-button/cutom-button.component'

import './collections-overview.styles.scss'

const CollectionsOverview = ({ collections, history, isPreview }) => {

    console.log(collections)
    return(
    <div className="collections-overview">
        {collections.map(({id, mainImg, title, routeName, ...rest}) => (
            <CollectionPreview key = {id} num={isPreview && '8'} {...rest}>
                <div className="see_more">
                    <img src={mainImg} alt={title}/>
                    <CustomButton onClick = {() => history.push(`/shop/${routeName}`)}>
                        Shop {routeName}
                    </CustomButton> 
                </div>
            </CollectionPreview>
        ))}
    </div>
)}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});
  
export default withRouter(connect(mapStateToProps)(CollectionsOverview));