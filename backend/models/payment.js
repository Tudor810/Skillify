import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user: String,
  type: String,
  stripeCustomerId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;