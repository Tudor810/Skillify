import dotenv from 'dotenv'

dotenv.config()

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

import Payment from '../models/payment.js'
import mongoose from 'mongoose'
const User = mongoose.model("User")

const createCheckout =  async (req, res) => {
    const priceId = req.body.priceId

    try {
        const user = await User.findById(req.userId)
         
        const session = await stripe.checkout.sessions.create({
            mode:'subscription',
            metadata: {
                userEmail: user.email,
                type: req.body.switch,
            },
            line_items:[
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            allow_promotion_codes : true,
            success_url: `${process.env.FRONTEND_URL}payment-succes`,
            cancel_url: `${process.env.FRONTEND_URL}pricing`
        })
        res.status(200).json({succes: true, url: session.url})
    } catch (err) {
      console.log(err);
        res.status(500).json({succes:false, message: err})
    }
}

const handleSubscriptionDeletion = async (data) => {
    const session = data.object
    
    const user = await User.findOne({customerId: session.customer})

    if(!user)
      return 

    user.categories = []
    user.planType = "Free"

    await user.save()
    
}

const handleInvoicePaid = async (data) => {
  const session2 = data.object 
           
  // session2.customer for user

  const user2 = await User.findOne({customerId: session2.customer})

  if(!user2)
    return 
    
  const payment2 = new Payment({
    user: user2.id,
    type: "Invoice",
    stripeCustomerId: session2.customer,
    amount: session2.total,
    currency: session2.currency,
  })
  await payment2.save()

  await user2.save()

 
}

const handleCheckoutCompleted = async (data) => {

  const session = data.object;
  const subscription = await stripe.subscriptions.retrieve(session.subscription);
  const productId = subscription.plan.product;
  const product = await stripe.products.retrieve(productId);
  

  const user = await User.findOne({email: session.metadata.userEmail})

  const payment = new Payment({
    user: session.metadata.userEmail,
    type: "Subscription",
    stripeCustomerId: session.customer,
    amount: session.amount_total,
    currency: session.currency,
  });

  await payment.save();

  const productType = product.name.split(' ')[1]
  
  if(!session.metadata.type)
  {
    if(productType === "Lesson")
    {
      user.planType = "Lesson"
    } else if(productType === "Tool")
    {
      user.planType = "Tool"
    } else if(productType === "Full")
    {
      user.planType = "Full"
    } 
  } else {
    if(productType === "Lesson")
    {
      user.planType = "Lesson Premium"
    } else if(productType === "Tool")
    {
      user.planType = "Tool Premium"
    } else if(productType === "Full")
    {
      user.planType = "Full Premium"
    } 
  }

 

  user.customerId = session.customer
  await user.save()

}

const handleCheckout = async (req, res, next) => {
    
    let data;
    let eventType;
    // Check if webhook signing is configured.
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];
      

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(err);
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }
    
    switch (eventType) {
        case 'checkout.session.completed':
            await handleCheckoutCompleted(data)
            break;

        case 'invoice.paid':
            await handleInvoicePaid(data)
            break;

        case "customer.subscription.updated":
            // To implement
            break;

        case "customer.subscription.deleted":
            await handleSubscriptionDeletion(data)
            break;
            
        default:
            console.log("Event unhandled");
            break;
      }
  
    res.sendStatus(200)
  }

const handlePortal = async (req, res) => {

  try {
    
    const user = await User.findOne({email: req.body.email})
    
    const customerId = user.customerId

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
    })
    res.status(200).json({succes:true, url: portalSession.url})
  } catch (err) {
    console.log(err);
    res.status(500).json({succes:false, error: err})
  }

}



export {
  createCheckout,
  handleCheckout,
  handlePortal
}