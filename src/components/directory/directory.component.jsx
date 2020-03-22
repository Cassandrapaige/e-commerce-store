import React, { Component } from 'react'

import './directory.styles.scss'
import MenuItem from '../menu-item/menu-item.component'


class Directory extends Component {
    constructor(props) {
        super();

        this.state = {
            sections: [
                {
                    title: 'Jackets',
                    imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1296&q=60',
                    id: 1,
                    linkUrl: 'jackets'
                },
                {
                    title: 'Sneakers',
                    imageUrl: 'https://images.unsplash.com/photo-1517466121016-3f7e7107c756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1296&q=60',
                    id: 2,
                    linkUrl: ''
                },
                {
                    title: 'Hats',
                    imageUrl: 'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1296&q=60',
                    id: 3,
                    linkUrl: ''
                },
                {
                    title: 'Womens',
                    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
                    size: 'large',
                    id: 4,
                    linkUrl: ''
                },
                {
                    title: 'Mens',
                    imageUrl: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1296&q=60',
                    size: 'large',
                    id: 5,
                    linkUrl: ''
                }
            ]
        }
    }

    render() {
        return (
            <div className = 'directory-menu'>
                    {/* this.state.sections.map(({ title, imageUrl, id, size }) => (
                        <MenuItem key= {id}title = {title} imageUrl = {imageUrl} size = {size}/>
                    )) */}
                    
                    {
                        this.state.sections.map(({id, ...rest}) => (
                            <MenuItem key = {id} {...rest} />
                        ))
                    }
            </div>
        )
    }
}

export default Directory;