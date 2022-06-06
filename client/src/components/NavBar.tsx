import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../stores/UserContext';
import CartButton from './CartButton';
import NavAuthButton from './NavAuthButton';

const NavBar = () => {
  const userContext = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        userContext.setUser(undefined);
        userContext.setCartCount(0);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-gray-200 z-10 px-8 py-4 flex items-center">
      <Link className="font-bold text-lg" to={'/'}>
        <h1>Digital Spine Demo</h1>
      </Link>
      <CartButton totalItems={userContext.cartCount ?? 0} />
      {userContext.user && <NavAuthButton login={false} logout={true} onClick={handleLogout} />}
      {!userContext.user && <NavAuthButton login={true} onClick={() => navigate('/login')} />}
      {!userContext.user && <NavAuthButton login={false} onClick={() => navigate('/signup')} />}
    </div>
  );
};

export default NavBar;
