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
      console.log(response.data);
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
    console.log('Finished loading: ', data);
    userContext.setUser(data.uid);
    userContext.setCartCount(data.cart);
  };

  useSession(setData);
  // TODO add data to context (uid and cartcount)
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default HomeView;
