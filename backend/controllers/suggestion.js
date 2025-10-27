import Suggestion from '../models/suggestion.js'

const writeSuggestion = async (req, res) => {
    try {

        const {email, content} = req.body
        const newSuggestion = new Suggestion({
            email: email,
            content: content
        })

        await newSuggestion.save()

        res.status(200).json({succes: true})

    } catch (err) {
        res.staus(500).json({succes: false, err: err})
    }
}


export default writeSuggestion