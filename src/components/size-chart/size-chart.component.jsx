import React, {Fragment, useState} from 'react'

import Checkbox from '../checkbox/checkbox.component'

import './size-chart.styles.scss'

const SizeChart = ({handleChange, children, ...props}) => {
    let links = []
    for(let i = 5; i < 12; i++) {
        links.push(
        <Fragment>
           <Checkbox type = {i} {...props} handleChange = {handleChange}/>
           <Checkbox type = {`${i}.5`} {...props} handleChange = {handleChange}/>
        </Fragment>
        )
    }

    return (
        <form className = 'size-chart'>
            <h3>Select Size</h3>
            {links}
            {children}
        </form>
    )
}

export default SizeChart