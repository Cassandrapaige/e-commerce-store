import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'

import './search-input.styles.scss'

const SearchInput = ({history}) => {
    const [value, setValue] = useState('');
    const [isVisible, setIsVisible] = useState(false)

    const handleSubmit = event => {
        event.preventDefault();
        history.push({
            pathname: '/search',
            search: value
        })
        setValue('')
    }

    const handleChange = event => {
        let value = event.target.value;
        setValue(value);
    }

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

export default withRouter(SearchInput)
