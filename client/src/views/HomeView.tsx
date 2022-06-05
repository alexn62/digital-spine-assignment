import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const HomeView = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default HomeView;
