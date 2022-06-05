const CartButton = ({ totalItems = 0 }: { totalItems: number }) => {
  return (
    <button className="ml-auto rounded-full drop-shadow-md bg-white px-3 py-1 flex items-center space-x-1 mx-1 hover:bg-gray-100">
      <p>Cart</p>
      {totalItems > 0 && (
        <div className="h-5 min-w-[20px] bg-red-500 rounded-full text-white text-sm flex flex-col justify-center items-center overflow-hidden px-2">
          <p>{totalItems}</p>
        </div>
      )}
    </button>
  );
};

export default CartButton;
