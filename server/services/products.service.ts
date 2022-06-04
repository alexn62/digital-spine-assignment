import { Product } from '../db/models/product.model';
import { CustomError } from '../shared/errors/CustomError.class';
import { PRODUCT_NOT_FOUND } from '../shared/errors/error-messages';

export interface Query {
  title: string | RegExp;
}

const getProducts = async (query: any) => {
  const filters = { ...query };
  if (filters.title) {
    filters.title = new RegExp(filters.title, 'i');
  }
  if (filters.tags) {
    filters.tags = { $in: filters.tags.split(' ').map((t: string) => new RegExp(t, 'i')) };
  }
  if (filters.sortBy) {
    delete filters.sortBy;
  }
  const products = await Product.find({ ...filters }).sort({
    price: query.sortBy && query.sortBy.split(' ')[1] === 'desc' ? -1 : 1,
  });
  return products;
};

const getProduct = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new CustomError(PRODUCT_NOT_FOUND, 404);
  }
  return product;
};

export default {
  getProducts,
  getProduct,
};
