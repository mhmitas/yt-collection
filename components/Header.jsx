import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ModeToggle } from './ModeToggle'
import { Check, LoaderCircle } from 'lucide-react'
import { getVideoId, saveVideoToLocalStorage } from '@/lib/utils'
import { saveVideo } from '@/lib/actions/video.action'
import toast from 'react-hot-toast'
import ProfileIcon from './ProfileIcon'

const Header = ({
    videoLink,
    setVideoLink,
    videoLinks,
    setVideoLinks,
    session
}) => {
    const [processing, setProcessing] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // simple validation
        if (videoLink.trim() === '') {
            return toast.error("Invalid video link")
        }

        const videoId = getVideoId(videoLink)

        // if session exists, save to the database otherwise save to the local storage. 
        if (session) {
            try {
                setProcessing(true)
                const res = await saveVideo({ videoId, userId: session?.user?.id })
                if (res.error) {
                    return toast.error(res?.error)
                }
                setVideoLinks([res?.data, ...videoLinks])
                setVideoLink('')
            } catch (error) {
                console.log(error)
                toast.error(error?.message || "Something went wrong! Please try again later")
            } finally { setProcessing(false) }
        } else {
            await saveToLocalStorage()
            // set link to the state
            setVideoLinks([{
                videoId,
                createdAt: Date.now(),
                pinned: false
            }, ...videoLinks])
            setVideoLink('')
        }
    };

    async function saveToLocalStorage() {
        const videoId = getVideoId(videoLink)
        await saveVideoToLocalStorage(videoId)
    }

    return (
        <header>
            <div className='border h-max px-4 sm:px-6 py-6 sm:py-8 rounded-lg dark:bg-muted bg-background space-y-6 md:space-y-8 relative shadow'>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold"><span className='text-red-600 [#ff0000]'>YouTube</span> Video Collection</h1>
                    <div className='flex items-center gap-2'>
                        <ModeToggle />
                        <ProfileIcon session={session} />
                    </div>
                </div>
                <Card className="dark:bg-muted bg-background max-w-3xl border-none shadow-none mx-auto pb-4">
                    <CardContent className="p-0">
                        <form onSubmit={handleSubmit} className="flex">
                            <Input
                                type="url"
                                name="videoLinks"
                                value={videoLink}
                                onChange={(e) => setVideoLink(e.target.value)}
                                placeholder="Paste YouTube video link here"
                                className="flex-grow rounded-full rounded-r-none pl-6 sm:p-6 border-r-0 text-blue-500"
                            />
                            <Button disabled={videoLink.length < 11} title="Click to save video" type="submit" className="border border-l-0 rounded-l-none sm:p-6 rounded-r-full disabled:opacity-85">
                                {processing ?
                                    <span className='animate-spin'><LoaderCircle /></span> :
                                    "Save"
                                }
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </header>
    )
}

export default Header