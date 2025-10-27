import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
    title:String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    chapters: String,
    content: Array,
    type: String,
    category: String,
    homework: String,
    test: String,
    flashcards: String,
    level: String,
    toolType: String
})

export default mongoose.model('Lesson', LessonSchema)