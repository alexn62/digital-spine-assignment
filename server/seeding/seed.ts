import { Product } from '../db/schemas/product.schema';
import data from './data.json';

export const seed = async () => {
  Product.remove();
  for (let product of data.products) {
    const newProduct = new Product(product);
    newProduct.save();
  }
};
