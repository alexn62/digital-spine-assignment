import { Product } from '../db/models/product.model';
import data from './data.json';

export const seed = async () => {
  Product.remove();
  for (let product of data.products) {
    const newProduct = new Product(product);
    newProduct.save();
  }
};
