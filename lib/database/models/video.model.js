import { model, models, Schema } from "mongoose";

const VideoSchema = new Schema(
    {
        videoId: {
            type: 'String',
            required: true,
            trim: true,
        },
        pinned: {
            type: 'Boolean',
            default: false
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
)

export const Video = models.Video || model("Video", VideoSchema)