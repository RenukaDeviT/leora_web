import { useContext } from 'react';

import { AppContex } from 'context';

const useAppContext = () => {
  const data = useContext(AppContex);
  if (!data) {
    throw new Error('Can not `useAppContext` outside of the `AppProvider`');
  }

  return data;
};

export default useAppContext;
