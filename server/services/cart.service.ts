import { Cart } from '../db/models/cart.model';

const createCart = async (userId: string) => {
  const cart = new Cart({ _id: userId, products: [] });
  await cart.save();
  return cart;
};

export default {
  createCart,
};
