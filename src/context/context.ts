import { createContext, Dispatch, SetStateAction } from 'react';

import { TUser } from 'utils/types';

type TAppContex = {
  user: TUser | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<TUser | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const AppContex = createContext<TAppContex | null>(null);

export const AppProvider = AppContex.Provider;