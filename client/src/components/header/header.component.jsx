import React from 'react'
import {withRouter} from 'react-router-dom'

import CustomButton from '../custom-button/cutom-button.component'

import {HeaderContainer,
        HeaderOverlay,
        Title,
        TitleSpan
    } from './header.styles'

const Header = ({history}) => {
    return (
        <HeaderContainer style = {{ backgroundImage: `url(https://sneakernews.com/wp-content/uploads/2018/12/nike-epic-react-flyknit-2-pixel-1.jpg)`}}>
            <HeaderOverlay>
                <TitleSpan>Epic React Flyknit</TitleSpan>
                <Title>More foam than ever</Title>
                <CustomButton inverted onClick = {() => history.push('/shop/details/9')}>Shop</CustomButton>
            </HeaderOverlay>
        </HeaderContainer>
    )
}

export default withRouter(Header);