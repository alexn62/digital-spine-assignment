import axios from 'axios';
import { CartProduct } from '../interfaces/product.interface';
import { useUserContext } from '../stores/UserContext';
import { Cart } from '../views/CartView';

const CartItem = ({
  product,
  setCart,
}: {
  product: CartProduct;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}) => {
  const { quantity, product: item } = product;
  const userContext = useUserContext();
  const handleRemove = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/removeFromCart/${item._id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        if (quantity > 1) {
          setCart((cart) => ({
            ...cart,
            products: cart.products.map((p) => {
              if (p.product._id === item._id) {
                return { quantity: p.quantity - 1, product: p.product };
              }
              return p;
            }),
          }));
        } else {
          setCart((cart) => ({
            ...cart,
            products: cart.products.filter((p) => p.product._id !== item._id),
          }));
        }
        userContext.setCartCount((prev) => (prev !== undefined ? prev - 1 : 0));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/addToCart/${item._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setCart((cart) => ({
          ...cart,
          products: cart.products.map((p) => {
            if (p.product._id === item._id) {
              return { quantity: p.quantity + 1, product: p.product };
            }
            return p;
          }),
        }));
        userContext.setCartCount((prev) => (prev !== undefined ? prev + 1 : 0));
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex w-full drop-shadow-md bg-white items-center space-x-2 pr-2">
      <img src={item.display_image} alt={item.title} className="h-14 w-28 object-cover aspect-auto rounded-md"></img>
      <h3 className="font-semibold text-md">{item.title}</h3>
      <div className="flex-grow"></div>
      <div className="flex space-x-2 bg-gray-200 rounded-md px-2 py-1 items-center">
        <button
          onClick={handleRemove}
          className="h-5 w-5 text-sm flex flex-col justify-between items-center bg-white rounded-full"
        >
          <p className="h-full w-full">-</p>
        </button>
        <p>{quantity}</p>
        <button
          onClick={handleAdd}
          className="h-5 w-5 text-sm flex flex-col justify-between items-center bg-white rounded-full"
        >
          <p className="h-full w-full">+</p>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
