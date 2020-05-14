import React from 'react'
import {withRouter} from 'react-router-dom'

import './header.styles.scss'
import CustomButton from '../custom-button/cutom-button.component'

const Header = ({history}) => {
    return (
        <header style = {{ backgroundImage: `url(https://sneakernews.com/wp-content/uploads/2018/12/nike-epic-react-flyknit-2-pixel-1.jpg)`}}>
            <div className="overlay">
                <span>Epic React Flyknit</span>
                <h1>More foam than ever</h1>
                <CustomButton inverted onClick = {() => history.push('/shop/details/9')}>Shop</CustomButton>
            </div>
        </header>
    )
}

export default withRouter(Header);