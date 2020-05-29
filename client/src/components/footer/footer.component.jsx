import React from 'react'
import {NavLink} from 'react-router-dom'

import {FooterContainer, NavigationListsContainer, ContactLinksContainer, SocialLink, NavigationItem, NavigationListContainer, Title} from './footer.styles'

const NavigationList = ({data, title, ...props}) => (
    <NavigationListContainer>
        <Title>{title}</Title>
            {
                data.map(item => (
                    <NavigationItem {...props}>{item.link}</NavigationItem>
                ))
            }
    </NavigationListContainer>
)

const FOOTER_ABOUT_DATA = [
    {
        id: 0,
        link: 'news'
    },
    {
        id: 1,
        link: 'careers'
    },
    {
        id: 2,
        link: 'investors'
    },
    {
        id: 3,
        link: 'sustainability'
    }
]

const FOOTER_CUSTOMER_DATA = [
    {
        id: 0,
        link: 'find a store'
    },
    {
        id: 1,
        link: 'sign up for email'
    },
    {
        id: 2,
        link: 'become a member'
    },
    {
        id: 3,
        link: 'site feedback'
    }
]

const FOOTER_HELP_DATA = [
    {
        id: 0,
        link: 'order status'
    },
    {
        id: 1,
        link: 'shipping and delivery'
    },
    {
        id: 2,
        link: 'returns'
    },
    {
        id: 3,
        link: 'payment options'
    },
    {
        id: 4,
        link: 'contact us'
    }
]

const Footer = () => {
    return (
        <FooterContainer>
            <NavigationListsContainer>
                <NavigationList isCapitalized data = {FOOTER_CUSTOMER_DATA}/>
                <NavigationList data = {FOOTER_HELP_DATA} title = 'Get Help' />
                <NavigationList data = {FOOTER_ABOUT_DATA} title = 'About Nike' />
            </NavigationListsContainer>

            <ContactLinksContainer>
                <SocialLink to = 'https://twitter.com/CassandraPaigee'><i class="fab fa-twitter"></i></SocialLink>
                <SocialLink to = 'https://twitter.com/CassandraPaigee'><i class="fab fa-facebook-f"></i></SocialLink>
                <SocialLink to = 'https://twitter.com/CassandraPaigee'><i class="fab fa-youtube"></i></SocialLink>
                <SocialLink to = 'https://twitter.com/CassandraPaigee'><i class="fab fa-instagram"></i></SocialLink>
            </ContactLinksContainer>
        </FooterContainer>
    )
}

export default Footer
