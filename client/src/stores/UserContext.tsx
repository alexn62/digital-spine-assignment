import { createContext, useContext, useState } from 'react';

interface UserContextProps {
  user: string | undefined;
  cartCount: number | undefined;
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCartCount: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const useUserContext = () => useContext<UserContextProps>(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | undefined>(undefined);
  const [cartCount, setCartCount] = useState<number | undefined>(undefined);

  return (
    <UserContext.Provider
      value={{
        user,
        cartCount,
        setUser,
        setCartCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
