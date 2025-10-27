import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    email: String, 
    planType: {
        type: String,
        default: "Free"
    },
    categories: {
        type: Array,
        default: []
    },
    credits: {
        type: Number,
        default: 1000
    },
    superCredits: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    resetToken: {
        type: String
    },
    image: {
        type: String,
        default: ""
    },
    customerId: String,
    language: {
       type: String,
       default: "English" 
    },
    extraCredits: {
        review: { type: Boolean, default: false},
        instagram: { type: Boolean, default: false},
        tiktok: { type: Boolean, default: false},
        discord: { type: Boolean, default: false},
        suggestion: {type: Boolean, default: false}
    },
    technique: String,
    tutorial: {
        type: Boolean,
        default: false
    }
});

mongoose.model('User', UserSchema);