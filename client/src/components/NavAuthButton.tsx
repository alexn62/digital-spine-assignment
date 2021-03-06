import React from 'react';

const NavAuthButton = ({
  onClick,
  login,
  logout = false,
  title,
}: {
  onClick: VoidFunction;
  login: boolean;
  logout?: boolean;
  title: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${login ? 'ml-8' : 'ml-1 px-9'} mr-1 rounded-full drop-shadow-md ${
        login ? 'bg-white hover:bg-gray-100' : 'bg-blue-500 hover:bg-blue-600'
      } px-3 py-1 flex items-center space-x-1 ${login ? 'text-blue-500' : 'text-white'}`}
    >
      {title}
    </button>
  );
};

export default NavAuthButton;
