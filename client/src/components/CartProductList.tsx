import { CartProduct } from '../interfaces/product.interface';
import { Cart } from '../views/CartView';
import CartItem from './CartItem';
import Modal from 'react-modal';
import { useState } from 'react';
import CustomButton from './CustomButton';
import axios from 'axios';
import { useUserContext } from '../stores/UserContext';
import { Link } from 'react-router-dom';
const CartProductList = ({
  products,
  setCart,
}: {
  products: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}) => {
  const TAX_RATE = 0.2;
  const userContext = useUserContext();

  const [clearCartModalIsOpen, setClearCartModalIsOpen] = useState(false);
  const openClearCartModal = () => {
    setClearCartModalIsOpen(true);
  };
  const closeClearCartModal = () => {
    setClearCartModalIsOpen(false);
  };
  const clearCart = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/checkout`,
        { status: 'cancelled' },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCart({ products: [] });
        userContext.setCartCount(0);
        closeClearCartModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false);
  const openCheckoutModal = () => {
    setCheckoutModalIsOpen(true);
  };
  const closeCheckoutModal = () => {
    setCheckoutModalIsOpen(false);
  };

  const checkout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/checkout`,
        { status: 'success' },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCart({ products: [] });
        userContext.setCartCount(0);
        closeCheckoutModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div className="flex justify-between">
      <div className="w-2/3 pt-2 flex flex-col space-y-2">
        {products.length === 0 && <p>The are no products in your cart yet!</p>}
        {products.map((product) => (
          <CartItem key={product.product._id} product={product} setCart={setCart} />
        ))}
      </div>
      <div className="w-1/3 mt-2 p-2  ml-2 border border-gray-200 rounded-md h-min flex flex-col">
        <h2 className="font-semibold text-lg">Checkout</h2>
        <div className="flex flex-col space-y-1 w-full">
          {products.map((product: CartProduct) => (
            <div key={product.product._id} className="flex justify-end w-full">
              <p className="line-clamp-1 flex-grow overflow-ellipsis">{`${product.quantity}x ${product.product.title}`}</p>
              <p className="whitespace-nowrap ml-auto">{`${(product.product.price.value * product.quantity).toFixed(
                2
              )} €`}</p>
            </div>
          ))}
          <br />
          <div className="flex justify-between">
            <p className="text-gray-500">Tax ({TAX_RATE * 100}%):</p>
            <p className="whitespace-nowrap ml-auto text-gray-500">{`${products
              .reduce((total: number, cp: CartProduct) => total + cp.product.price.value * cp.quantity * TAX_RATE, 0)
              .toFixed(2)} €`}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Total:</p>
            <p className="whitespace-nowrap ml-auto">{`${products
              .reduce(
                (total: number, cp: CartProduct) => total + cp.product.price.value * cp.quantity * (1 + TAX_RATE),
                0
              )
              .toFixed(2)} €`}</p>
          </div>
        </div>
        <br />
        {!userContext.user && (
          <div className="flex justify-between items-center">
            <p>Login to checkout.</p>
            <Link to="/login">
              <CustomButton title="Login" onClick={() => {}} />
            </Link>
          </div>
        )}
        {userContext.user && (
          <div className="flex space-x-2 justify-end">
            <CustomButton title="Clear Cart" onClick={openClearCartModal} negative={true} />
            <Modal
              ariaHideApp={false}
              isOpen={clearCartModalIsOpen}
              onRequestClose={closeClearCartModal}
              style={customStyles}
              contentLabel="Clear Cart Modal"
            >
              <div className="flex flex-col space-y-2">
                <h2 className="font-semibold text-lg">Clear Cart</h2>
                <p>Are you sure you want to clear your cart?</p>
                <div className="flex justify-end space-x-2">
                  <CustomButton title="Cancel" onClick={closeClearCartModal} negative={true} />
                  <CustomButton title="Clear Cart" onClick={clearCart} />
                </div>
              </div>
            </Modal>
            <CustomButton title="Checkout" onClick={openCheckoutModal} />
            <Modal
              ariaHideApp={false}
              isOpen={checkoutModalIsOpen}
              onRequestClose={closeCheckoutModal}
              style={customStyles}
              contentLabel="Clear Cart Modal"
            >
              <div className="flex flex-col space-y-2">
                <h2 className="font-semibold text-lg">Finalize Checkout</h2>
                <p>Are you sure you want to checkout?</p>
                <div className="flex justify-end space-x-2">
                  <CustomButton title="Cancel" onClick={closeCheckoutModal} negative={true} />
                  <CustomButton title="Checkout" onClick={checkout} />
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartProductList;
