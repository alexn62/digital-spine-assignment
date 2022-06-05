import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const HomeView = () => {
  const cookies = document.cookie;
  console.log(cookies);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default HomeView;
