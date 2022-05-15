import { createContext, useContext, useState } from 'react';

const CollectionContext = createContext();
const useCollection = () => useContext(CollectionContext);

const CollectionProvider = ({ value, children }) => {
  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
};

export { CollectionProvider, useCollection };
