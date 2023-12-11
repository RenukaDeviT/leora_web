import { useContext } from 'react';

import { AppContex } from 'context';

const useAppContext = () => {
  const data = useContext(AppContex);
  console.log(AppContex);// eslint-disable-line no-console
  console.log(data);// eslint-disable-line no-console
  if (!data) {
    throw new Error('Can not `useAppContext` outside of the `AppProvider`');
  }

  return data;
};

export default useAppContext;
