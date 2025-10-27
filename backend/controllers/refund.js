import Refund from '../models/refund.js'

const refundRequest = async (req, res) => {

    const {email, user, refundReason} = req.body

    try {
        const refund = await Refund.findOne({user: user})

        if(refund)
            return res.status(409).json({succes: false, msg: "You already requested a refund"})

    } catch (err) {
        return res.status(500).json({success: false, msg: "Server error"})
    }
  
    const newRefund = new Refund({
        content: refundReason,
        email: email,
        user: user
    })
    
    try {
        await newRefund.save()
        return res.status(200).json({succes:true, msg: "Refund requested successfully. We will get back to you in a few days via mail."})
    } catch (err) {
        return res.status(500).json({succes:false, msg: "Something went wrong. Please try again."})
    }
}

export default refundRequest
