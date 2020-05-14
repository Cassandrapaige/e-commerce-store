import React from 'react'

const Video = ({url}) => {
    return (
        <video 
            playsInline loop muted autoPlay
            id="video">
            <source src={url} type="video/mp4"/>
            Your browser does not support the video tag.
        </video>
    )
}

export default Video;
