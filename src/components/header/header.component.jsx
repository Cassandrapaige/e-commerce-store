import React from 'react'

import './header.styles.scss'

const Header = () => {
    return (
        <header>
            <div className="overlay">
            <video 
                playsInline loop muted autoPlay
                id="video">
                <source src='https://static.nike.com/a/videos/q_90,vc_vp9/kc6rpsxztlpgy70ztztp/video.webm'/>
                Your browser does not support the video tag.
            </video>
            </div>
        </header>
    )
}

export default Header;