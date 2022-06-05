import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import ProductView from './views/ProductView';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />}>
            <Route index element={<ProductsView />} />
            <Route path="/products/:id" element={<ProductView />} />
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
