import React, {useState} from 'react'

import './radio-button.styles.scss'

const RadioButton = ({type, handleChange}) => {
    return (
        <div className = 'size-option'>
            <input 
                type="radio" 
                name="size" 
                id= {type} 
                value = {type}
                onChange = {handleChange}
                required
            />
            <label htmlFor = {type}>US {type}</label>
        </div>
    )
}

export default RadioButton