import React from 'react'
import { Button } from './ui/button'
import Videos from './videos'
import { removeVideoFromLocalStorage } from '@/lib/utils'

const VideosSection = ({ videoLinks, setVideoLinks, session }) => {

    const removeVideo = (index, videoId, _id) => {
        setVideoLinks(videoLinks.filter((_, i) => i !== index))
        removeVideoFromLocalStorage(videoId)
    }

    return (
        <section className='pt-1 flex-1'>
            {videoLinks.length > 0 && <div className='flex justify-between items-center gap-4 mb-8'>
                <p className='text-xs sm:text-sm italic'>Videos will be removed after 1 hour. Pin videos to keep them saved!</p>
                <Button className="h-7" size="sm" variant="outline">Clear all</Button>
            </div>}
            <Videos videos={videoLinks} removeVideo={removeVideo} />
            {/* <p className='mt-8 font-medium pb-2 text-lg'>Pinned</p>
            <Videos videos={videoLinks} /> */}
        </section>
    )
}

export default VideosSection



