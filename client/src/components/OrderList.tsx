import { Order } from '../views/OrderHistoryView';
import OrderItem from './OrderItem';

const OrderList = ({ orders }: { orders: Order[] }) => {
  return (
    <ul className="flex flex-col space-y-2 items-center mt-12 py-2">
      {orders.map((order: Order) => (
        <OrderItem order={order} key={order._id} />
      ))}
    </ul>
  );
};

export default OrderList;
