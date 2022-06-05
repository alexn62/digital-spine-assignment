import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Cart } from '../db/models/cart.model';
import { Order } from '../db/models/order.model';
import { INVALID_ORDER_STATUS } from '../shared/errors/error-messages';

const checkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const POSSIBLE_STATES = ['success', 'cancelled'];
    const { status } = req.body;
    if (!POSSIBLE_STATES.includes(status)) {
      return res.status(400).send({ message: INVALID_ORDER_STATUS });
    }
    // @ts-ignore
    const user = req.session.uid;
    const cart = await Cart.findOne({ sessionId: req.sessionID });
    const { products } = cart;
    const order = await Order.create({
      status,
      user,
      products: products.map((product: { id: mongoose.Types.ObjectId; quantity: number }) => ({
        product: product.id,
        quantity: product.quantity,
      })),
    });
    cart.products = [];
    await cart.save();
    res.status(200).json({ order });
  } catch (err) {
    return next(err);
  }
};

export default {
  checkout,
};
