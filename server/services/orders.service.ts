import { Order } from '../db/models/order.model';

const getSuccessfulOrders = async (user: string) => {
  const orders = await Order.find({ user, status: 'success' }).populate('products.product');
  return orders;
};

export default {
  getSuccessfulOrders,
};
