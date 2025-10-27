import {YoutubeTranscript} from 'youtube-transcript'
import { getTextExtractor } from 'office-text-extractor'

// Create a new instance of the extractor.
const extractor = getTextExtractor()

const getVideo = (req, res) => {
    const {link} = req.query

    YoutubeTranscript.fetchTranscript(link, {lang: "en"})
    .then((transcript) => {

        res.status(200).json(transcript)
    })
    .catch((err) => {
        res.status(500).json({succes: false, err: err})
    })
}


const getPdf = async (req, res) => {

    const extractor = getTextExtractor()

    try {
        const text = await extractor.extractText({
            input:  req.files.file.data,
            type: 'buffer'
        })

        res.status(200).json(text)
    } catch (err) {
        console.log(err);
    } 
    
}

export {
    getVideo,
    getPdf,
}