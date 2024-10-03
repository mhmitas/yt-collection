videoSchema = new Schema(
    {
        videoId: {
            type: 'String',
            required: true,
            trim: true,
            unique: true
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