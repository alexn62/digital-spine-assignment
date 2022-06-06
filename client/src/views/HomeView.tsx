import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useUserContext } from '../stores/UserContext';

export interface Session {
  uid: string | undefined;
  cart: number | undefined;
}

const fetchSession = async (): Promise<Session> => {
  const data = await axios
    .get(`${process.env.REACT_APP_API_URL}/session`, { withCredentials: true })
    .then((response) => {
      return response.data;
    });
  return data;
};

function useSession(setData: (data: Session) => void) {
  return useQuery<Session, Error>('session', () => fetchSession(), { onSuccess: setData });
}

const HomeView = () => {
  const userContext = useUserContext();
  const setData = (data: Session) => {
    userContext.setUser(data.uid);
    userContext.setCartCount(data.cart);
  };

  useSession(setData);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default HomeView;
