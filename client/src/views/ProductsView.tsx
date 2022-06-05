import { useQuery } from 'react-query';
import axios from 'axios';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';
import { useCallback, useState } from 'react';

export interface SearchFilters {
  search: string;
}

const fetchProducts = async (filters: string | undefined): Promise<[]> => {
  const products = await axios
    .get(`${process.env.REACT_APP_API_URL}/products?${filters}`)
    .then((response) => response.data);
  return products;
};

function useProducts(filters: string | undefined) {
  return useQuery<[], Error>(['products', filters], () => fetchProducts(filters));
}

const ProductsView = () => {
  const [filters, setFilters] = useState<SearchFilters>({} as SearchFilters);
  const getParams = useCallback((params: SearchFilters) => {
    let queryString = '';
    if (params.search) {
      queryString += `title=${params.search}`;
    }
    return queryString;
  }, []);
  const { isLoading, data, error } = useProducts(getParams(filters));
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <Filters setFilters={setFilters} />
      {error && <div>{error.message}</div>}
      {isLoading && <p>Loading...</p>}
      {data && <ProductList products={data} />}
    </div>
  );
};

export default ProductsView;
