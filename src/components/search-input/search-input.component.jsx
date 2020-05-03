import React, {useState} from 'react'

import './search-input.styles.scss'

const SearchInput = ({handleSubmit, handleChange, value}) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <form className = {`search-form ${isVisible && 'expand-search'}`} onSubmit={handleSubmit}>
            <div className="input-field">
                <input 
                    onClick = {() => setIsVisible(!isVisible)}
                    type="text" 
                    placeholder='&#xF002; Search' 
                    onChange={handleChange} 
                    value = {value}/>            
            </div>
        </form>
    )
}

export default SearchInput
