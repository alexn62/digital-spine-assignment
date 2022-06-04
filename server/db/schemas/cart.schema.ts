import mongoose from 'mongoose';

export const cartSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    unique: true,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
  },
});
