import { createContext, useContext } from 'react';

interface UserContextProps {}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const useUserContext = () => useContext<UserContextProps>(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
