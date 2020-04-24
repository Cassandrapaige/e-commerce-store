import React from 'react'

import './homepage.styles.scss'
import Directory from '../../components/directory/directory.component'
import Header from '../../components/header/header.component'

const homepage = () => {
    return (
        <div className="homepage">
            <Header />
            <Directory />
        </div>
    )
}

export default homepage;