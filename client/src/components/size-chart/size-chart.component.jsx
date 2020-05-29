import React from 'react'

import RadioButton from '../radio-button/radio-button.component'

import './size-chart.styles.scss'

const SizeChart = ({message, ...props}) => {
    let links = []

    for(let i = 10; i < 25; i++) {
        let size = i / 2;
        links.push(
            <RadioButton type = {size} {...props}/>
        )
      }
      
    return (
        <div className = 'size-chart'>
            <h3 style = {{color: `${message ? '#FA5400' : 'black'}`}}>Select Size</h3>
            <div className = {`size-chart-container ${message && 'warning-border'}`}>
                {links}
            </div>
            <span class = 'warning-message'>{message}</span>
        </div>
    )
}

export default SizeChart