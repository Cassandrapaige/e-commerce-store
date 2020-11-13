import React, {useRef, useEffect} from 'react'

import './video.styles.scss'

const Video = ({url}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.play();
    }, []);

    return (
        <video 
            playsInline loop muted autoPlay 
            preload="auto"
            ref = {videoRef}
            id="video">
            <source src={url} type="video/mp4"/>
            Your browser does not support the video tag.
        </video>
    )
}

export default Video;
