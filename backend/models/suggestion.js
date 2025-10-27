import mongoose from 'mongoose'

const SuggestionSchema = new mongoose.Schema({
    email: String,
    content: String, 
    createdAt: {type: Date, default: Date.now },
})


export default mongoose.model('Suggestion', SuggestionSchema)