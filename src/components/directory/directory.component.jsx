import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectDirectorySections} from '../../redux/directory/directory.selectors'

import MenuItem from '../menu-item/menu-item.component'

import './directory.styles.scss'

const Directory = ({sections}) => (
    <div className = 'directory-menu'>
        {sections.map(({id, ...rest}) => (
            <MenuItem key = {id} {...rest} />
        ))}
    </div>
)

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})
export default connect(mapStateToProps)(Directory);