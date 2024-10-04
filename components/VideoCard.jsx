import { Card, CardContent, } from "@/components/ui/card"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"


const VideoCard = ({ video, index, removeVideo }) => {
    const { videoId } = video;

    return (
        <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md max-w-lg w-full hover:ring-2">
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
                        title="Click to remove"
                        variant="ghost"
                        className="size-6 hover:text-red-600"
                        size="icon"
                        onClick={() => removeVideo(index, videoId, video?._id)}
                    >
                        <Trash2 size={15} />
                        <span className="sr-only">Remove video</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default VideoCard