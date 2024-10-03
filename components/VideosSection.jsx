import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Pin, Trash2 } from 'lucide-react'

const VideosSection = ({ videoLinks }) => {
    return (
        <section className='pt-1 flex-1'>
            {videoLinks.length > 0 && <div className='flex justify-between items-center gap-4'>
                <p className='text-xs sm:text-sm italic'>Videos will be removed after 1 hour. Pin videos to keep them saved!</p>
                <Button className="h-7" size="sm" variant="outline">Clear all</Button>
            </div>}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {videoLinks.map((videoId, index) => (
                    <VideoCard videoId={videoId} key={index} index={index} />
                ))}
            </div>
            <p className='mt-10 font-medium pb-2 text-lg'>Pinned</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-1">
                {videoLinks.map((videoId, index) => (
                    <VideoCard videoId={videoId} key={index} index={index} />
                ))}
            </div>
        </section>
    )
}

export default VideosSection



const VideoCard = ({ videoId, index }) => {

    const removeVideo = (index) => {
        setVideoLinks(videoLinks.filter((_, i) => i !== index))
    }

    return (
        <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-lg max-w-lg mx-auto w-full">
            <CardContent className="p-0">
                <div className="aspect-video">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`YouTube video player ${index + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
                <div className="p-4 py-1 flex justify-between items-center">
                    <span className="text-xs font-medium">Video {index + 1}</span>
                    <Button
                        variant="ghost"
                        className="size-6"
                        size="icon"
                        onClick={() => removeVideo(index)}
                    >
                        <Trash2 size={15} />
                        <span className="sr-only">Remove video</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}