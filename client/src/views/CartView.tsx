import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import CartProductList from '../components/CartProductList';
import { CartProduct } from '../interfaces/product.interface';

export interface Cart {
  products: CartProduct[];
}

const fetchCart = async (): Promise<Cart> => {
  try {
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}/cart`, { withCredentials: true })
      .then((response) => {
        return response.data;
      });
    return data;
  } catch (e) {
    console.log(e);
    return { products: [] };
  }
};

function useCart(setCart: React.Dispatch<React.SetStateAction<Cart>>) {
  return useQuery<Cart, Error>('cart', fetchCart, { onSuccess: setCart });
}

const CartView = () => {
  const [cart, setCart] = useState<Cart>({ products: [] });
  const { isLoading, error } = useCart(setCart);
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      {error ? (
        error.message.match(/404/) ? (
          <p>The are no products in your cart yet!</p>
        ) : (
          <p>Something went wrong!</p>
        )
      ) : (
        <></>
      )}
      {isLoading && <p>Loading...</p>}
      {cart && !isLoading && <CartProductList products={cart.products} setCart={setCart} />}
    </div>
  );
};

export default CartView;
