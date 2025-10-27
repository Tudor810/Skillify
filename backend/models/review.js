import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    username: String,
    content: String, 
    createdAt: {type: Date, default: Date.now },
    rating: Number,
    image: String
})

export default mongoose.model('Review', ReviewSchema)