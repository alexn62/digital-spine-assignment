import { useQuery } from 'react-query';
import axios from 'axios';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';
import { useCallback, useState } from 'react';
export interface SearchFilters {
  search: string;
  category: string;
  tags: string[];
  sortBy: string;
  brand: string;
}

const fetchProducts = async (filters: string | undefined): Promise<[]> => {
  console.log(filters);
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
    let query = [];
    if (params.search) {
      query.push(`title=${params.search}`);
    }
    if (params.category) {
      query.push(`category=${params.category.replaceAll(' ', '%20').replaceAll('&', '%26')}`);
    }
    if (params.tags && params.tags.length > 0) {
      query.push(`tags=${params.tags.join('+').replaceAll(' ', '%20').replaceAll('&', '%26')}`);
    }
    if (params.sortBy) {
      query.push(`sortBy=${params.sortBy.replaceAll(' ', '+')}`);
    }
    if (params.brand) {
      query.push(`brand=${params.brand.replaceAll(' ', '%20').replaceAll('&', '%26')}`);
    }
    return query.join('&');
  }, []);

  const { isLoading, data, error } = useProducts(getParams(filters));
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <Filters filters={filters} setFilters={setFilters} />
      {error && <div>{error.message}</div>}
      {isLoading && <p>Loading...</p>}
      {data && <ProductList products={data} />}
    </div>
  );
};

export default ProductsView;
