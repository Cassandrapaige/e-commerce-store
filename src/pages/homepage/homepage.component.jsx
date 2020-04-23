import React from 'react'

import './homepage.styles.scss'
import Directory from '../../components/directory/directory.component'
import Header from '../../components/header/header.component'
import ShopPage from '../../pages/shop/shop.component'

const homepage = () => {
    return (
        <div className="homepage">
            <Header />
            <ShopPage num = '6'/>
        </div>
    )
}

export default homepage;