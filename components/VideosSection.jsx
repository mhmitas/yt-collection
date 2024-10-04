import React from 'react'
import { Button } from './ui/button'
import Videos from './videos'
import { removeVideoFromLocalStorage } from '@/lib/utils'
import askConfirm from './modals/askConfirm'
import { deleteVideo } from '@/lib/actions/video.action'

const VideosSection = ({ videoLinks, setVideoLinks, session }) => {

    const removeVideo = async (index, videoId, _id) => {
        const ask = await askConfirm("Are you sure? You want to remove this video.")
        if (!ask) return;

        // update the state
        setVideoLinks(videoLinks.filter((_, i) => i !== index))

        // delete based on the session
        if (session) {
            await deleteVideo({ videoId: _id })
        } else {
            removeVideoFromLocalStorage(videoId)
        }
    }

    const removeAllVideos = async () => {
        const ask = await askConfirm("Are you sure? You want to remove all videos.")
        if (!ask) return;

        if (!session) {
            await localStorage.removeItem('videos')
            setVideoLinks([])
        }
    }

    return (
        <section className='pt-1 flex-1'>
            <div className='flex justify-between items-center gap-4 mb-8'>
                {!session && <p className='text-xs sm:text-sm italic'>Sign in for more features</p>}
                {videoLinks.length > 0 &&
                    <>
                        <p className='text-xs sm:text-sm italic'>{session && "Go beyond the feed—watch what interests you!"}</p>
                        <Button onClick={removeAllVideos} className="h-7" size="sm" variant="outline">Clear all</Button>
                    </>}
            </div>
            <Videos videos={videoLinks} removeVideo={removeVideo} />
            {/* <p className='mt-8 font-medium pb-2 text-lg'>Pinned</p>
            <Videos videos={videoLinks} /> */}
        </section>
    )
}

export default VideosSection

// Videos will be removed after 1 hour. Pin videos to keep them saved!