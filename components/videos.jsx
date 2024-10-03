import React from 'react'
import VideoCard from './VideoCard'

const Videos = ({ videos, removeVideo }) => {

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
                <VideoCard video={video} key={index} index={index} removeVideo={removeVideo} />
            ))}
        </div>
    )
}

export default Videos