import { useUserContext } from '../stores/UserContext';
import CartButton from './CartButton';
import NavAuthButton from './NavAuthButton';

const NavBar = () => {
  const userContext = useUserContext();
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-gray-200 z-10 px-8 py-4 flex items-center">
      <h1 className="font-bold text-lg">Digital Spine Demo</h1>
      <CartButton totalItems={userContext.cartCount ?? 0} />
      {!userContext.user && <NavAuthButton login={true} onClick={() => {}} />}
      {!userContext.user && <NavAuthButton login={false} onClick={() => {}} />}
    </div>
  );
};

export default NavBar;
