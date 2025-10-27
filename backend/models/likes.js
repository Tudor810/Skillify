import mongoose from 'mongoose';

const LikesSchema = new mongoose.Schema({
    user: String,
    threadId: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
})


export default mongoose.model('Likes', LikesSchema)