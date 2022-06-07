import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { Product } from '../interfaces/product.interface';
import { useUserContext } from '../stores/UserContext';

const fetchProduct = async (id: string): Promise<Product> => {
  const product = await axios
    .get(`${process.env.REACT_APP_API_URL}/products/${id}`, { withCredentials: true })
    .then((response) => {
      return response.data;
    });
  return product;
};

function useProduct(id: string) {
  return useQuery<Product, Error>(['product', id], () => fetchProduct(id));
}

const ProductView = () => {
  const { id } = useParams();
  const { isLoading, data: product, error } = useProduct(id!);
  const userContext = useUserContext();
  const addToCart = async (product: any) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/addToCart/${product._id}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        userContext.setCartCount((prev) => (prev === undefined ? 1 : prev + 1));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error!</div>}
      {product && (
        <div className="mt-16 flex max-w-4xl mx-auto ">
          <img className="w-1/3 h-full object-cover" src={product.display_image} alt={product._id}></img>
          <div className="w-2/3 flex flex-col space-y-4">
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <p className="text-lg line-clamp-6 overflow-scroll">{product.description}</p>
            <p className="text-lg">{`${product.price.currency === 'EURO' ? 'EUR' : 'USD'} ${product.price.value.toFixed(
              2
            )}`}</p>
            {product.available && <CustomButton title="Add to Cart" onClick={handleAddToCart} />}
            {product.available === false && <p className="text-sm text-red-500">Unavailable</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductView;
