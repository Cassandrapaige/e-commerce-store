import React from 'react'
import {animated, useSpring, useTransition, config} from 'react-spring'

import './filter-menu.styles.scss'

const FilterMenu = ({isVisible, handleClick, items}) => {
    const props = useSpring({
        opacity: isVisible ? 0 : 1
    })

    return (
        <animated.div style= {props} className = 'filter-menu'>
           <ul className="sort_by_tags">
               {
                   items.map(item => (
                       <li onClick = {handleClick}>{item}</li>
                   ))
               }
           </ul>
        </animated.div>
    )
}

export default FilterMenu