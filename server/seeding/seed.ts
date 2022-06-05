import { Product } from '../db/models/product.model';
import data from './data.json';

export const seed = async () => {
  console.log('Seeding!');
  if (process.env.NODE_ENV !== 'dev') {
    return;
  }
  const products = await Product.find();
  if (products.length > 0) {
    return;
  }
  for (let product of data.products) {
    const newProduct = new Product(product);
    newProduct.save();
  }
};
