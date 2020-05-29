import React, {useState} from 'react'

import {ArrowIcon} from '../icons/icons.component'

import {
    FilterOptionsContainer,
    FilterOptionsHeader,
    FilterOptions,
    CollapsibleContainer
} from './filter-container.styles'

const FilterContainer = ({title, children}) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
           <FilterOptionsContainer>
               <FilterOptionsHeader onClick = {() => setIsOpen(!isOpen)}>
                   <h4>{title}</h4>
                   <ArrowIcon isDropdownHidden = {!isOpen} />
               </FilterOptionsHeader>

               <FilterOptions isOpen = {isOpen}>
                <CollapsibleContainer isOpen = {isOpen}>
                  {children}
                </CollapsibleContainer>
                </FilterOptions>
           </FilterOptionsContainer>
    )
}

export default FilterContainer