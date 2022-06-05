import ProductPreview from './ProductPreview';

const ProductList = ({ products }: { products: any[] }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <ProductPreview key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
