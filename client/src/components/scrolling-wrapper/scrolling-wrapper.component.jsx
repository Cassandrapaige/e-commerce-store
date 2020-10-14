import React, {useState, useEffect} from 'react'

import {
    ScrollingWrapperContainer,
    ScrollingWrapper,
    ScrollingContent,
    WrapperItem,
    Arrow,
    ProgressBarContainer,
    Scrollbar,
    ProgressBar
}from './scrolling-wrapper.styles'

import SkeletonScreen from '../skeleton-screen/skeleton-screen.component'
import ItemHeader from '../item-header/item-header.component'
import ItemDetails from '../item-details/item-details.component'

const ScrollingContainer = ({collections, children}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const getscrollPosition = window.innerWidth / 3;
  const [scrollPosition, setScrollPosition] = useState(getscrollPosition)

  useEffect(() => {
      window.addEventListener('resize', () => {setScrollPosition(window.innerWidth / 3);
      })
      return () => window.removeEventListener('resize', () => setScrollPosition())
  },[])

  const POS = { 
    LEFT: -scrollPosition,
    RIGHT: scrollPosition,
  }

  const scrollWrapper = (el, type) => {
    const content = el.target.parentNode.parentNode;
    const scrollWidth = content.scrollWidth - content.offsetWidth;
    if (type === 'left' && content.scrollLeft > 0) {
      content.scrollBy(POS.LEFT, 0);
      setScrollProgress(prev => prev - collections.length / 1.4)
    } 
    if (type === 'right' && content.scrollLeft < scrollWidth) {
      content.scrollBy(POS.RIGHT, 0)
      setScrollProgress(prev => prev + collections.length / 1.4)
    }
  }

return (
<ScrollingWrapperContainer>
    <ScrollingWrapper>
      <h2>You might also like</h2>
      <ScrollingContent>
      {
        collections.map(collection => (
          isLoading ? 
            <WrapperItem>
              <SkeletonScreen />
            </WrapperItem>
            :
            <WrapperItem>
              <ItemDetails isLoading = {isLoading} item = {collection} />
            </WrapperItem>
          )
        )
      }
      <Arrow
        onClick = {(el) => scrollWrapper(el, 'left')}>
        <i class="fas fa-chevron-left"></i>
      </Arrow>
      <Arrow isRight
        onClick = {(el) => scrollWrapper(el, 'right')}>
        <i class="fas fa-chevron-right"></i>
      </Arrow>
      </ScrollingContent>
    </ScrollingWrapper>
    <ProgressBarContainer>
      <Scrollbar>
        <ProgressBar scrollProgress = {scrollProgress}></ProgressBar>
      </Scrollbar>
    </ProgressBarContainer>
  </ScrollingWrapperContainer>
  )
}

export default ScrollingContainer