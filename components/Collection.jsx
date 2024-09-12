'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { ModeToggle } from './ModeToggle'

export default function Component() {
    const [videoLink, setVideoLink] = useState('')
    const [videoLinks, setVideoLinks] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (videoLink.trim() !== '') {
            setVideoLinks([...videoLinks, getVideoId(videoLink)])
            setVideoLink('')
        }
    }

    const getVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
        const match = url.match(regExp)
        return (match && match[2].length === 11) ? match[2] : url
    }

    const removeVideo = (index) => {
        setVideoLinks(videoLinks.filter((_, i) => i !== index))
    }

    return (
        <div className={`min-h-screen`}>
            <div className="container max-w-screen-xl mx-auto p-4 transition-colors duration-200">
                <div className='border h-max p-6 rounded-lg dark:bg-muted bg-background'>
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">YouTube Video Collection</h1>
                        <ModeToggle />
                    </div>
                    <Card className="mb-8 dark:bg-muted bg-background max-w-3xl border-none shadow-none">
                        <CardContent className="p-4">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <Input
                                    type="text"
                                    value={videoLink}
                                    onChange={(e) => setVideoLink(e.target.value)}
                                    placeholder="Paste YouTube video link here"
                                    className="flex-grow outline-none"
                                />
                                <Button type="submit">Save Video</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-8">
                    {videoLinks.map((videoId, index) => (
                        <Card key={index} className="overflow-hidden transition-shadow duration-200 hover:shadow-lg">
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
                    ))}
                </div>
                {videoLinks.length === 0 && (
                    <p className="text-center text-muted-foreground mt-8">
                        No videos added yet. Paste a YouTube link above to get started!
                    </p>
                )}
            </div>
        </div>
    )
}