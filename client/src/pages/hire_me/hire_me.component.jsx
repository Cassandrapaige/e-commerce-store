import React from 'react'
import image1 from '../../assets/hire_me1.jpg'
import image2 from '../../assets/hire_me2.jpg'
import image3 from '../../assets/hire_me3.jpg'
import image6 from '../../assets/hire_me6.jpg'
import image7 from '../../assets/hire_me7.jpg'
import image8 from '../../assets/hire_me8.jpg'
import image9 from '../../assets/hire_me9.jpg'
import image10 from '../../assets/hire_me10.jpg'
import image11 from '../../assets/hire_me11.jpg'
import image12 from '../../assets/hire_me12.jpg'

import './hire_me.styles.scss'

const HireMePage = () => {

    const IMAGES = [
            image1, image2, image3, image6, image7, 
            image8, image9, image10, image11, image12];

    return (
        <div className = 'hire-me-page'>
           {
               IMAGES.map((image, index) => (
                    <img src={image} key = {index} alt="Nike art work reading 'just do it'"/>  
               ))
           }
        </div>
    )
}

export default HireMePage
