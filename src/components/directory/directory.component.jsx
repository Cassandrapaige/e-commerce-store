import React, { Component } from 'react'

import './directory.styles.scss'
import MenuItem from '../menu-item/menu-item.component'


class Directory extends Component {
    constructor(props) {
        super();

        this.state = {
            sections: [
                {
                    title: 'Womens',
                    imageUrl: 'https://www.tennisnuts.com/images/product/full/WMNS-NIKE-LUNARTEMPO-2-818098_500_C_PREM.jpg',
                    size: 'large',
                    id: 4,
                    linkUrl: ''
                },
                {
                    title: 'Mens',
                    imageUrl: 'https://www.tennisnuts.com/images/product/full/Nike-Zoom-Vomero-9-Mens-Running-Shoe-642195_003_C_PREM.jpg',
                    size: 'large',
                    id: 5,
                    linkUrl: ''
                },
                {
                    title: 'Kids',
                    imageUrl: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/oymq8x2fxuejhfaykeiv/air-vapormax-2019-older-shoe-vwwMlD.jpg',
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