import mongoose from 'mongoose';
import { cartSchema } from '../schemas/cart.schema';

export const Cart = mongoose.model('Cart', cartSchema);
