import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : url
}

async function getVideosFromLocalStorage() {
  const videos = await JSON.parse(localStorage.getItem('videos')) || []
  return videos
}

export async function saveVideoToLocalStorage(videoId) {
  if (!videoId) return

  const video = {
    videoId,
    createdAt: Date.now(),
    pinned: false
  }

  const videos = await getVideosFromLocalStorage();

  if (videos) {
    videos.push(video)
    localStorage.setItem('videos', JSON.stringify(videos))
  }
}

export async function removeVideoFromLocalStorage(videoId) {
  const videos = await getVideosFromLocalStorage()

  const updatedVideos = await videos?.filter(video => video.videoId !== videoId)

  if (updatedVideos) {
    localStorage.setItem('videos', JSON.stringify(updatedVideos))
  }
}