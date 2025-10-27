import mongoose from 'mongoose'


const RefundSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    email: String,
    content: String, 
    createdAt: {type: Date, default: Date.now },
})

export default mongoose.model('Refund', RefundSchema)