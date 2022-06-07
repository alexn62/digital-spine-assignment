import React from 'react';
import { TAX_RATE } from '../helpers/globals';
import { CartProduct } from '../interfaces/product.interface';

const OrderProductItem = ({ product }: { product: CartProduct }) => {
  return (
    <li className="flex justify-between w-full h-8 items-center" key={product.product._id}>
      <p>
        {product.product.title} x {product.quantity}
      </p>
      <p>{(product.quantity * product.product.price.value * (1 + TAX_RATE)).toFixed(2)} EUR</p>
    </li>
  );
};

export default OrderProductItem;
