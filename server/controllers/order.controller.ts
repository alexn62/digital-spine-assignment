import { Request, Response, NextFunction } from 'express';
import { Cart } from '../db/models/cart.model';
import { Order } from '../db/models/order.model';

const checkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { userId } = req.session.uid;
    const cart = await Cart.findOne({ sessionId: req.sessionID });
    const { products } = cart;
    const order = await Order.create({
      userId,
      products: products.map((product: { id: string; quantity: number }) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
    });
    await cart.deleteMany();
    res.status(200).json({ order });
  } catch (err) {
    return next(err);
  }
};

export default {
  checkout,
};
