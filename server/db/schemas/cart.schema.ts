import mongoose from 'mongoose';

export const cartSchema = new mongoose.Schema({
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
  },
});
