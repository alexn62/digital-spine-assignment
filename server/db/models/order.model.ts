import mongoose from 'mongoose';
import { orderSchema } from '../schemas/order.schema';

export const Order = mongoose.model('Order', orderSchema);
