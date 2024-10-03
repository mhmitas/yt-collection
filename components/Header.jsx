import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ModeToggle } from './ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check } from 'lucide-react'

const Header = ({
    videoLink,
    setVideoLink,
    videoLinks,
    setVideoLinks
}) => {

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


    return (
        <header>
            <div className='border h-max px-4 sm:px-6 py-6 sm:py-8 rounded-lg dark:bg-muted bg-background space-y-6 md:space-y-8 relative shadow'>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold"><span className='text-red-500'>YouTube</span> Video Collection</h1>
                    <div className='flex items-center gap-2'>
                        <ModeToggle />
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <Card className="dark:bg-muted bg-background max-w-3xl border-none shadow-none mx-auto pb-4">
                    <CardContent className="p-0">
                        <form onSubmit={handleSubmit} className="flex">
                            <Input
                                type="url"
                                value={videoLink}
                                onChange={(e) => setVideoLink(e.target.value)}
                                placeholder="Paste YouTube video link here"
                                className="flex-grow rounded-full rounded-r-none pl-6 sm:p-6 border-r-0 text-blue-500"
                            />
                            <Button title="Click to save video" type="submit" className="border border-l-0 rounded-l-none sm:p-6 rounded-r-full"><Check /></Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </header>
    )
}

export default Header