const ProductPreview = ({ product }: { product: any }) => {
  return (
    <div className="flex flex-col drop-shadow-md rounded-lg bg-white w-48 m-2 cursor-pointer overflow-hidden group">
      {product.available && (
        <div className="absolute bg-green-400 px-2 rounded-lg text-white bottom-[-24px] group-hover:bottom-2 right-2 transition-all duration-300 hover:bg-green-500">
          + Add
        </div>
      )}
      <img
        className="h-24 object-contain aspect-square rounded-lg"
        src={product.display_image}
        alt={product.title}
      ></img>
      <div className="flex flex-col p-2 space-y-1 justify-start h-full ">
        {product.available === false && <p className="text-sm text-red-500">Unavailable</p>}
        <h3 className="text-lg font-semibold line-clamp-2">{product.title}</h3>
        <div className="flex-grow"></div>
        <p className="text-medium line-clamp-3 text-gray-400">{product.description}</p>
        {product.is_best_seller && <div className="rounded-md px-2 bg-blue-500 text-white">Best Seller</div>}
        <p className="text-medium">{`${product.price.currency === 'EURO' ? 'EUR' : 'USD'} ${product.price.value.toFixed(
          2
        )}`}</p>
      </div>
    </div>
  );
};

export default ProductPreview;
