import React from 'react'
import { withRouter } from 'react-router-dom'

import './menu-item.styles.scss'

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {

    const handleClick = () => {
        history.push(`${match.url}${linkUrl}`)
    }
    
    return (
        <div className={`${size} menu-item`}>
            <div 
                className="background-image" 
                style = {{ backgroundImage: `url(${imageUrl})` }} 
            />
            <div className="content">
                <h1 className="title"  onClick = {handleClick}>{title}</h1>
            </div>
        </div>
    )
}

export default withRouter(MenuItem);
