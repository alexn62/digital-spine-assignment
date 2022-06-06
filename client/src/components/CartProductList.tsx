import { CartProduct } from '../interfaces/product.interface';
import { Cart } from '../views/CartView';
import CartItem from './CartItem';

const CartProductList = ({
  products,
  setCart,
}: {
  products: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}) => {
  return (
    <div className="w-2/3 pt-2 flex flex-col space-y-2">
      {products.map((product) => (
        <CartItem key={product.product._id} product={product} setCart={setCart} />
      ))}
    </div>
  );
};

export default CartProductList;
