"use server"

import { connectDB } from "../database/mongoose"
import { User } from "../database/models/user.model"
import mongoose from "mongoose"
import { Video } from "../database/models/video.model"
import { revalidatePath } from "next/cache"

export async function saveVideo({ videoId, userId }) {
    try {
        await connectDB()

        // verify the user
        const user = await User.exists({ _id: new mongoose.Types.ObjectId(`${userId}`) })
        if (!user) {
            return { error: "User not found" }
        }

        // check if the video already exists;
        const isExists = await Video.exists({ videoId, owner: new mongoose.Types.ObjectId(`${userId}`) })
        if (isExists) {
            return { error: "Video already exists" }
        }

        // save the video to the database;
        const video = await Video.create({
            videoId,
            owner: userId
        })
        // return the video
        return JSON.parse(JSON.stringify({ data: video, success: true }))
    } catch (error) {
        throw error
    }
}

export async function getVideosByUser({ userId }) {
    try {
        await connectDB()

        const videos = await Video.find({ owner: new mongoose.Types.ObjectId(`${userId}`) }).sort({ createdAt: "desc" }) || []

        return JSON.parse(JSON.stringify({ data: videos, success: true }))
    }
    catch (error) {
        throw error
    }
}

export async function deleteVideo({ videoId }) {
    try {
        await connectDB()

        // delete the video
        const video = await Video.findByIdAndDelete(videoId)

        if (video) {
            revalidatePath("/")
            return JSON.parse(JSON.stringify({ success: true, video }))
        }

    } catch (error) {
        throw error
    }
}

export async function deleteAllVideos({ userId }) {
    try {
        await connectDB()

        userId = new mongoose.Types.ObjectId(`${userId}`)

        if (!userId) {
            return { error: "Invalid user id" }
        }
        const res = await Video.deleteMany({ owner: userId })
        if (res?.deletedCount > 0) {
            return { success: true }
        }
    } catch (error) {
        throw error
    }
}