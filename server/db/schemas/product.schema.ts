import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  display_image: {
    type: String,
  },
  description: { type: String },
  brand: { type: String },
  category: { type: String },
  tags: { type: [String] },
  available: { type: Boolean },
  is_best_seller: { type: Boolean },
  price: {
    currency: { type: String },
    value: { type: Number },
  },
});
