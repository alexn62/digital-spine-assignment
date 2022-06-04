import mongoose from 'mongoose';
import { Cart } from '../db/models/cart.model';

const createCart = async (sessionId: string) => {
  const cart = new Cart({ sessionId, products: [] });
  await cart.save();
  return cart;
};

export default {
  createCart,
};
