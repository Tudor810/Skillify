import mongoose from 'mongoose';
import utils from './utils.js'
const User = mongoose.model('User');
import moment from 'moment'
import Payment from '../models/payment.js'

const handleLogin = async (req, res, next) => {

    if(req.cookies.token) {
        res.status(400).json({succes: false, error: "You are already logged in"})
        return 
    } 

    try {
        const user = await User.findOne({email: req.body.email})
        if(!user)
            return res.status(401).json({succes: false, error: "Could not find user"})

        const isValid = utils.validPassword(req.body.password, user.hash, user.salt)

        if(isValid) {
            const jwt = utils.issueJWT(user)
            const jwtTimeParts = jwt.expires.split(" ")
            const expiryTime = moment().add(jwtTimeParts[0], jwtTimeParts[1]).toDate()
        
            res.cookie('token', jwt.token, {
                expires:  expiryTime,
                httpOnly: true,
                secure: false
            })
            
            req.user = user
            next()  
        } else {
            return res.status(401).json({succes: false, error: "Invalid password"})
        }   
    } catch(err) {
        return res.status(500).json({succes: false, error: err})
    }

}

const handleGoogleLogin = async (req, res , next) => {
    if(req.cookies.token) {
        return res.status(400).json({succes: false, error: "You are already logged in"})    
    } 

    try {
        const user = await User.findOne({email: req.body.email})
        if(user)
        {
            const jwt = utils.issueJWT(user)
            const expiryTime = moment().add(jwt.expires[0] + jwt.expires[1], 'days').toDate()
        
            res.cookie('token', jwt.token, {
                expires:  expiryTime,
                httpOnly: true,
                secure: false
            })
            user.image = req.body.picture
            await user.save()
            console.log(user);
            return res.status(200).json({succes: true, user: user})
        }
        const newUser = new User({
            username: req.body.name,
            email: req.body.email,
            image: req.body.picture
        })
        const newUserData = await newUser.save()
        const jwt = utils.issueJWT(newUserData)

        console.log(jwt.expires[0] + jwt.expires[1]);
        const expiryTime = moment().add(jwt.expires[0] + jwt.expires[1], 'days').toDate()
        
        res.cookie('token', jwt.token, {
            expires:  expiryTime,
            httpOnly: true,
            secure: false
        })

        return res.status(200).json({succes: true, user: newUserData})

    } catch (err) {
        console.log(err);
        return res.status(500).json({succes: false, error: err})
    }

}

const handleRegister = async (req, res, next) => {

    if(req.cookies.token) {
        return res.status(400).json({succes: false, error: "You can`t create an account while you are logged in"})    
    } 
   
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({succes: false, error: "User already exists"})
        }       
        
        const saltHash = utils.genPassword(req.body.password)

        const salt = saltHash.salt
        const hash = saltHash.hash

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            hash: hash,
            salt: salt
        })
        try {
            const user = await newUser.save()
            const jwt = utils.issueJWT(user)
    
            const jwtTimeParts = jwt.expires.split(" ")
    
            const expiryTime = moment().add(jwtTimeParts[0], jwtTimeParts[1]).toDate()
    
            res.cookie('token', jwt.token, {
                expires:  expiryTime,
                httpOnly: true,
                secure: false
            })
    
            return res.status(200).json({succes: true, user: user})
        } catch (err) {
            console.log(err);
            return res.status(500).json({succes: false, error: err})
        }} catch (err) {
            return res.status(500).json({succes: false, error: err})
}

}

const handleLogOut = async (req, res) => {

    try {   
        await res.clearCookie('token')
        res.status(200).json({succes: true})
    } catch (err) {
        res.status(500).json({succes: false, error: err})
    }
} 

const sendData = async (req, res) => {

    try {
        const user = await User.findById(req.userId)

        const userData = {
            id: user.id,
            email: user.email,
            username: user.username,
            planType: user.planType,
            credits: user.credits,
            superCredits: user.superCredits,
            image: user.image,
            categories: user.categories,
            extraCredits: user.extraCredits,
            tutorial: user.tutorial
        }
        res.status(200).json({succes: true, user: userData})
    }
    catch (err) {
        res.status(500).json({succes: false, error: err})
    }
}

const sendLanguage = async (req, res) => {

    try {
        const user = await User.findById(req.userId)
        
        if(user.language)
            return res.status(200).json({succes: true, language: user.language})
        else 
            return res.status(200).json({succes: true, language: "English"})
    } catch (err) {
        console.log("Error in sending Language", err);
        return res.status(500).json({succes: false, error: err})
    }

}

const sendTechnique = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        
        if(user.technique)
            return res.status(200).json({succes: true, technique: user.technique})
        else 
            return res.status(200).json({succes: true, technique: "Exam Past Paper Technique"})
    } catch (err) {
        console.log("Error in sending Language", err);
        return res.status(500).json({succes: false, error: err})
    }
} 
const changeLanguage = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        user.language = req.body.language

        user.technique = req.body.technique

        await user.save()

        res.status(200).json({succes: true})
    } catch (err) {
        res.status(500).json({succes: false, error: err})
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.userId)
        await res.clearCookie('token')
        res.status(200).json({succes: true})
    } catch (err) {
        res.status(500).json({succes: false, error: err})
    }
}

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find()

        res.status(200).json({succes: true, payments: payments.length})

    } catch (err) {
        res.status(500).json({succes: false, error: err})
    }
}

const addCredits = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if(user.extraCredits[req.body.type === true])
            return res.status(200).json({succes: true})

        user.credits += 200
        
        
        user.extraCredits[req.body.type] = true

        await user.save()

        res.status(200).json({succes: true})
    } catch (err) {
        res.status(500).json({succes: false, error: err})
        console.log(err);
    }
}

const changeTutorial = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        user.tutorial = true

        await user.save()

        res.status(200).json({succes: true})
    } catch (err) {
        res.status(500).json({succes: false})
    }
}
export {
    handleLogin,
    handleRegister,
    handleLogOut,
    sendData,
    handleGoogleLogin,
    sendLanguage,
    changeLanguage,
    deleteUser,
    sendTechnique,
    getPayments,
    addCredits,
    changeTutorial
}