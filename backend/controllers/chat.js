import mongoose from 'mongoose'
const User = mongoose.model('User');
import Thread from '../models/thread.js'
import Likes from '../models/likes.js'

import {ObjectId} from 'mongodb'

const createThread = async (req, res) => {
    
    try {

        const {title, content} = req.body

        const user = await User.findById(req.userId)

        const thread = new Thread({
            title: title,
            content: content,
            user: user.email,
            type: "thread"
        })

        await thread.save()

        res.status(200).json({succes: true})

    } catch (err) {
        res.status(500).json({succes: false})
    }
}

const getAllThreads = async (req, res) => {
    try{

        const threads = await Thread.find({type: "thread"}).sort({createdAt: -1}).skip(req.query.skip).limit(req.query.limit)

        const threadData = await Promise.all(threads.map(async (thread) => {
            const user = await User.findOne({email: thread.user})
            
            const liked = thread.likes.find(item => item === user.email) ? true : false

            const newThread = {
                _id: thread._id,
                title: thread.title,
                content: thread.content,
                createdAt: thread.createdAt,
                liked: liked,
                likes: thread.likes.length,
                replies: thread.replies.length,
                username: user.username,
                image: user.image
            }

            // console.log(newThread);
            return newThread
        }))

        res.status(200).json({succes: true, threadData: threadData})
    } catch (err) {
        res.status(500).json({succes: false})
    }
} 

const getOneThread = async (req, res) => {

    try {
        const thread = await Thread.findById(req.params.id)
    
        const user = await User.findOne({email: thread.user})
        
        const retrieveRepliesAndCount = async (commentId) =>  {
            let count = 0;
            const comment = await Thread.findById(commentId)

            if (comment.replies && comment.replies.length > 0) {
              for (const reply of comment.replies) {
                const replyCount = await retrieveRepliesAndCount(reply);
                
                count += replyCount + 1; 
              }
            }
      
            comment.replyCount = count;
            return count;
          };
      
        const retrieveCommentsAndCount = async (commentId) => 
        {
            let count = 0;
            const comment = await Thread.findById(commentId)

            if (comment.replies && comment.replies.length > 0) {
                for (const reply of comment.replies) {
                count += await retrieveRepliesAndCount(reply) + 1; // Add 1 for each reply
                console.log(count);
                }
            }

            comment.replyCount = count;
            return count;
        }

        let totalCommentCount = 0;

        for (const comment of thread.replies) {
          totalCommentCount += await retrieveCommentsAndCount(comment) + 1; // Add 1 for each direct comment
        }
        
        thread.replyCount = totalCommentCount;

        
        const liked = thread.likes.find(item => item === user.email) ? true : false


        const newThread = {
            _id: thread._id,
            title: thread.title,
            content: thread.content,
            createdAt: thread.createdAt, 
            liked: liked,
            likes: thread.likes.length,
            replies: thread.replyCount,
            username: user.username,
            image: user.image
        }
        
        res.status(200).json({succes: true, threadData: newThread})
    } catch (err) {
        console.log(err);
        res.status(500).json({succes: false, err: err})
    }
}

const createComment = async (req, res) => {
    try {
        

        const {content, postId} = req.body

        const user = await User.findById(req.userId)

        const comment = new Thread({
            _id: new ObjectId(),
            content: content,
            user: user.email,
            type: "comment"
        })

        console.log(comment._id);
        const thread = await Thread.findById(postId)

        thread.replies.push(comment._id)


        await thread.save()

        await comment.save()

        res.status(200).json({username: user.username, image: user.image})

    } catch (err) {
        console.log(err);
        res.status(500).json({succes: false, err: err})
    }
}

const getComments = async (req, res) => {
    try{

        
        const thread = await Thread.findById(req.query.threadId)
        
        const user = await User.findOne({email: thread.user})

        const commentData = await Promise.all(thread.replies.map(async (comment) => {

            const commentData = await Thread.findById(comment)

            const liked = commentData.likes.find(item => item === user.email) ? true : false

            const newComment = {
                _id: commentData._id,
                content: commentData.content,
                createdAt: commentData.createdAt, 
                likes: commentData.likes.length,
                liked: liked,
                replies: commentData.replies.length,
                username: user.username,
                image: user.image
            }

            return newComment
        }))


        res.status(200).json({succes: true, commentData: commentData.reverse()})
    } catch (err) {
        console.log(err);
        res.status(500).json({succes: false, err: err})
    }
}

const addReplies = async (req, res) => {
    try {
        
        const {content, commentId, username} = req.body

        const user = await User.findById(req.userId)

        const reply = new Thread({
            _id: new ObjectId(),
            content: "<@" + username + "> " + content,
            user: user.email,
            type: "comment"
        })

        const comment = await Thread.findById(commentId)

        comment.replies.push(reply._id)

        await comment.save()

        await reply.save()

        res.status(200).json({succes: true})

    } catch (err) {
        console.log(err);
        res.status(500).json({succes: false, err: err})
    }
}

const getReplies = async (req, res) => {
    try{
        const comment = await Thread.findById(req.query.commentId)
        
        const user = await User.findOne({email: comment.user})

        const commentData = await Promise.all(comment.replies.map(async (reply) => {

            
            const replyData = await Thread.findById(reply)
            
            const liked = replyData.likes.find(item => item === user.email) ? true : false

            const newReply = {
                _id: replyData._id,
                content: replyData.content,
                createdAt: replyData.createdAt, 
                likes: replyData.likes.length,
                liked: liked,
                replies: replyData.replies.length,
                username: user.username,
                image: user.image
            }

            return newReply
        }))


        res.status(200).json({succes: true, commentData: commentData.reverse()})
    } catch (err) {
        console.log(err);
        res.status(500).json({succes: false, err: err})
    }
}

const like = async (req, res) => {

    const {type, threadId} = req.body

    try {

        const thread = await Thread.findById(threadId)
        const user = await User.findById(req.userId)

        if(type === "add")
        {   
            const newLike = new Likes({
                threadId: threadId,
                user: user.email,
            })

            await newLike.save()
            
            thread.likes.push(user.email)
        }
        else 
        {
            await Likes.findOneAndDelete({user: user.email, threadId: threadId})

            thread.likes = thread.likes.filter(item => item !== user.email)
        }

        await thread.save()

        res.status(200).json({succes: true})
        
    } catch (err) {
        console.log(err);
        res.status(500).json({succes: false})
    }
}


export {
    createThread,
    getAllThreads,
    getOneThread,
    createComment,
    getComments,
    addReplies,
    getReplies,
    like
}