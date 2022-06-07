import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import OrderList from '../components/OrderList';
import { CartProduct } from '../interfaces/product.interface';

export interface Order {
  _id: string;
  createdAt: string;
  products: CartProduct[];
}

const fetchOrders = async (): Promise<Order[]> => {
  try {
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}/orders`, { withCredentials: true })
      .then((response) => {
        return response.data.orders.sort((prev: Order, curr: Order) => {
          return new Date(curr.createdAt).getTime() - new Date(prev.createdAt).getTime();
        });
      });
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

function useOrders(setOrders: React.Dispatch<React.SetStateAction<Order[]>>) {
  return useQuery<Order[], Error>('cart', fetchOrders, { onSuccess: setOrders });
}

const OrderHistoryView = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { isLoading, error } = useOrders(setOrders);

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      {error ? error.message.match(/404/) ? <p>The are no orders to display!</p> : <p>Something went wrong!</p> : <></>}
      {isLoading && <p>Loading...</p>}
      {orders && !isLoading && <OrderList orders={orders} />}
    </div>
  );
};

export default OrderHistoryView;
