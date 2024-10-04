'use client'

import { useEffect, useState } from 'react'
import VideosSection from './VideosSection'
import Header from './Header'

export default function Collection({ videos, session }) {
    const [videoLink, setVideoLink] = useState('')
    const [videoLinks, setVideoLinks] = useState(videos ? videos : [])

    useEffect(() => {
        getLocalVideos()
    }, [])

    function getLocalVideos() {
        if (!videos && !session) {
            setVideoLinks(localStorage.getItem('videos') ? JSON.parse(localStorage.getItem('videos')) : [])
        }
    }

    return (
        <div className={`min-h-screen flex mb-8`}>
            <div className="container max-w-screen-xl mx-auto p-2 sm:p-4 transition-colors duration-200 flex-1 flex flex-col">
                <Header
                    videoLink={videoLink}
                    setVideoLink={setVideoLink}
                    videoLinks={videoLinks}
                    setVideoLinks={setVideoLinks}
                    session={session}
                />
                <VideosSection
                    videoLinks={videoLinks}
                    setVideoLinks={setVideoLinks}
                    session={session}
                />
                {videoLinks.length === 0 && (
                    <p className="text-center text-muted-foreground mt-8">
                        No videos added yet. Paste a YouTube link above to get started!
                    </p>
                )}
            </div>
        </div>
    )
}