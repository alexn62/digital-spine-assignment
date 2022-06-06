import React from 'react';

const CustomButton = ({
  title,
  onClick,
  negative = false,
}: {
  title: string;
  onClick: () => void;
  negative?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 border ${
        negative
          ? 'border-red-500 text-red-500 hover:text-white hover:bg-red-500'
          : 'text-white bg-blue-500 hover:bg-blue-600'
      } rounded-md`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
