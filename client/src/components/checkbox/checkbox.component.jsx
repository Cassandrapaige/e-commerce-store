import React from 'react'

import {CustomCheckbox, FormGroup} from './checkbox.styles'

const Checkbox = ({label, onChange, ...rest}) => {
    return (
    <FormGroup>
        <CustomCheckbox {...rest}/>
        <input 
            type="checkbox" 
            id={label} 
            name={label} 
            value={label} 
            onChange = {onChange}
        />
        <label htmlFor={label}>
            {label}            
        </label>
    </FormGroup> 
    )
}

export default Checkbox