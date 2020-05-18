import React from 'react'

import Checkbox from '../checkbox/checkbox.component'

import './size-chart.styles.scss'

const SizeChart = ({children, ...props}) => {
    let links = []

    for(let i = 10; i < 25; i++) {
        let x = i / 2;
        links.push(
            <Checkbox type = {x} {...props}/>
        )
      }
      
    return (
        <div className = 'size-chart'>
            <h3>Select Size</h3>
            {links}
            {children}
        </div>
    )
}

export default SizeChart