import { Response, NextFunction, Request } from 'express';
import ordersService from '../services/orders.service';
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const orders = await ordersService.getSuccessfulOrders(req.session.uid);
    res.status(200).json({ orders });
  } catch (err) {
    return next(err);
  }
};

export default {
  getOrders,
};
