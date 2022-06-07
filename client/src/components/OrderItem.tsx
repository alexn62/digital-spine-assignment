import { useState } from 'react';
import { TAX_RATE } from '../helpers/globals';
import { CartProduct } from '../interfaces/product.interface';
import { Order } from '../views/OrderHistoryView';
import OrderProductItem from './OrderProductItem';

const OrderItem = ({ order }: { order: Order }) => {
  const dateOptions = { year: 'numeric', month: 'long', day: '2-digit' } as Intl.DateTimeFormatOptions;
  const [expanded, setExpanded] = useState(false);
  return (
    <li
      key={order._id}
      className="drop-shadow-md rounded-md p-3 w-3/4 bg-white cursor-pointer hover:bg-gray-100"
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="flex justify-between">
        <p>Date: {new Date(order.createdAt).toLocaleString('en-US', dateOptions)}</p>
        <h2 className="text-gray-500">Order #{order._id}</h2>
      </div>
      <div className="flex justify-between">
        <p>
          Total items:{' '}
          {order.products.reduce((totalItems: number, product: CartProduct) => totalItems + product.quantity, 0)}
        </p>
        <p>
          Total:{' '}
          {`${order.products
            .reduce(
              (total: number, cp: CartProduct) => total + cp.product.price.value * cp.quantity * (1 + TAX_RATE),
              0
            )
            .toFixed(2)} €`}
        </p>
      </div>

      <ul className={`flex flex-col space-y-1 items-center overflow-hidden ${expanded ? `h-auto` : 'h-0'}`}>
        {order.products.map((product: CartProduct) => (
          <OrderProductItem product={product} key={product.product._id} />
        ))}
      </ul>
    </li>
  );
};

export default OrderItem;
