import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import ProductView from './views/ProductView';
import { QueryClientProvider, QueryClient } from 'react-query';
import { UserProvider } from './stores/UserContext';
import CartView from './views/CartView';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeView />}>
              <Route index element={<ProductsView />} />
              <Route path="/products/:id" element={<ProductView />} />
              <Route path="/cart" element={<CartView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/signup" element={<SignUpView />} />
            </Route>
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
