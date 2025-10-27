import mongoose from 'mongoose'

const ThreadSchema = new mongoose.Schema({
    title: String,
    content: String,
    user: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    replies: {
        type: Array,
        default: []
    },
    likes: {
        type: Array, 
        default: []
    },
    replyCount : {
        type: Number,
        default: 0
    },
    type: String
})


export default mongoose.model('Thread', ThreadSchema)