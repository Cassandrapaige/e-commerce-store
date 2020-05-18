import React, {useState} from 'react'

import './checkbox.styles.scss'

const Checkbox = ({type, handleChange}) => {
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

export default Checkbox