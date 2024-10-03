'use client'

import { useState } from 'react'
import VideosSection from './VideosSection'
import Header from './Header'

export default function Component() {
    const [videoLink, setVideoLink] = useState('')
    const [videoLinks, setVideoLinks] = useState([])

    return (
        <div className={`min-h-screen border flex`}>
            <div className="container max-w-screen-xl mx-auto p-2 sm:p-4 transition-colors duration-200 flex-1 flex flex-col">
                <Header
                    videoLink={videoLink}
                    setVideoLink={setVideoLink}
                    videoLinks={videoLinks}
                    setVideoLinks={setVideoLinks}
                />
                <VideosSection videoLinks={videoLinks} />
                {videoLinks.length === 0 && (
                    <p className="text-center text-muted-foreground mt-8">
                        No videos added yet. Paste a YouTube link above to get started!
                    </p>
                )}
            </div>
        </div>
    )
}