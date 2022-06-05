import mongoose from 'mongoose';
import { Cart } from '../db/models/cart.model';

const createCart = async (sessionId: string, productId: string) => {
  const cart = new Cart({
    sessionId,
    products: [
      {
        product: productId,
        quantity: 1,
      },
    ],
  });
  await cart.save();
  return cart;
};

export default {
  createCart,
};
