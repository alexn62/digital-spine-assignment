import mongoose from 'mongoose';
import { productSchema } from '../schemas/product.schema';

export const Product = mongoose.model('Product', productSchema);
