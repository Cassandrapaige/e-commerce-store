import React from 'react'
import {NavLink} from 'react-router-dom'

import {FooterContainer, NavigationListsContainer, ContactLinksContainer, SocialLink, NavigationItem, NavigationListContainer, Title, SneakyFooter} from './footer.styles'

const NavigationList = ({data, title, ...props}) => (
    <NavigationListContainer>
        <Title {...props}>{title}</Title>
            {
                data.map(item => (
                    <NavigationItem {...props} key = {item.id}>{item.link}</NavigationItem>
                ))
            }
    </NavigationListContainer>
)

const Footer = () => {
    return (
        <FooterContainer>
            <NavigationListsContainer>
                <NavigationList isCapitalized data = {FOOTER_CUSTOMER_DATA}/>
                <NavigationList withPadding data = {FOOTER_HELP_DATA} title = 'Get Help'/>
                <NavigationList withPadding data = {FOOTER_ABOUT_DATA} title = 'About Nike'/>
            </NavigationListsContainer>

            <ContactLinksContainer>
                <SocialLink to = 'https://twitter.com/CassandraPaigee'><i className="fab fa-twitter"></i></SocialLink>
                <SocialLink to = 'https://twitter.com/CassandraPaigee'><i className="fab fa-facebook-f"></i></SocialLink>
                <SocialLink to = 'https://twitter.com/CassandraPaigee'><i className="fab fa-youtube"></i></SocialLink>
                <SocialLink to = 'https://twitter.com/CassandraPaigee'><i className="fab fa-instagram"></i></SocialLink>
            </ContactLinksContainer>
            <SneakyFooter>
                <p><i className="fas fa-map-marker-alt"></i> Canada</p>
                <p>If you're here because you're thinking about hiring me, <NavLink to = '/justdoit'>click here.</NavLink></p>
            </SneakyFooter>
        
        </FooterContainer>
    )
}

export default Footer

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