import Review from '../models/review.js'

const getAll = async (req, res) => {

    try {

        const reviews = await Review.find().sort({createdAt: -1}).skip(req.query.skip).limit(req.query.limit)

        res.status(200).json({succes: true, data: reviews}) 
    } catch (err) {
        res.status(500).json({succes: false, error: err})
    }

}

const createReview = async (req, res) => {
    const {content, rating, user, image, username} = req.body


    const newReview = new Review({
        content: content,
        rating: rating,
        user: user,
        image: image,
        username: username
    })

    try {
        await newReview.save()
        res.status(200).json({succes:true})
    } catch (err) {
        res.status(500).json({succes:false, msg: "Something went wrong"})
    }
}

export {
    getAll,
    createReview
}